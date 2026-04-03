let {Webhook} = require("svix");
require("dotenv").config();
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
let {getAuth} = require("@clerk/express");
const { UserModel } = require("../models/usermodel");
let Redis = require("ioredis");
let crypto = require("crypto");
const { ProductModel } = require("../models/productmodel");
let Paystack = require("@paystack/paystack-sdk");
const { OrderModel } = require("../models/ordermodel");
let client = new Redis();
let paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

client.on("error",(err)=>{
    console.error("Redis Connection Error:", err);
});

client.on("connect",()=>{
    console.log("Connected to Redis successfully!");
});


//clerkwebhook
let clerkwebhook = async(req,res)=>{
    try{
        let payload = req.body;
        let headers = {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        }
        let wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
       let evt = wh.verify(payload,headers);
       if(evt.type==="user.created"){
        let userdata = new UserModel({
            clerkid:evt.data.id,
            username:evt.data.username,
            profile_pic:evt.data.profile_image_url,
            email:evt.data.email_addresses[0].email_address
        });
        await userdata.save();
        return res.status(200).json({
            success:true,
            message:"user created successfully"
        });
       }
       else if(evt.type==="user.updated"){
        await UserModel.findOneAndUpdate({clerkid:evt.data.id},{ 
            username:evt.data.username,
            profile_pic:evt.data.profile_image_url,
            email:evt.data.email_addresses[0].email_address
        });
          return res.status(200).json({
            success:true,
            message:"user updated successfully"
        });
       }
       else if(evt.type==="user.deleted"){
      await UserModel.findOneAndDelete({clerkid:evt.data.id});
        return res.status(200).json({
            success:true,
            message:"user deleted successfully"
        });
       }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//getproducts
let getproducts = async (req,res)=>{
    try{
        const cachekey = "all_products";
        let data = await client.get(cachekey);
        if(data){
            return res.status(200).json({
                success:true,
                products:JSON.parse(data),
                source:"cache"
            });
        }
        let products = await ProductModel.find();
        if(!products.length){
            return res.status(404).json({
                success:false
            });
        }
        await client.set("all_products",JSON.stringify(products),"EX",60);
        return res.status(200).json({
            success:true,
            products:products
        });
    }
    catch(error){
       return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//getcart
let getcart = async(req,res)=>{
    try{
         let {userId} = getAuth(req);
        if(!userId){
            return res.status(401).json({
                success:false
            });
        }
        let data = await client.get(`user:${userId}`);
        if(data){
            return res.status(200).json({
                success:true,
                cart:JSON.parse(data),
                source:"cache"
            });
        }
        let userdata = await UserModel.findOne({clerkid:userId});
        if(!userdata){
            return res.status(400).json({
                success:false
            });
        }
        await client.set(`user:${userId}`,JSON.stringify(userdata.cartdata),"EX",60);
        return res.status(200).json({
            success:true,
            cart:userdata.cartdata
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//addtocart
let addtocart = async(req,res)=>{
    try{  
        let {userId} = getAuth(req);
        if(!userId){
            return res.status(401).json({
               success:false 
            })
        }
        let {itemId,sizeindex} = req.body;
        if(!itemId || sizeindex === undefined || sizeindex === null){
            return res.status(404).json({
                success:false
            });
        }

        let cached = await client.get(`user:${userId}`);
        if(cached){
            let cachedcart = JSON.parse(cached);
           let index =  cachedcart.findIndex((element)=>
            element.id===itemId && element.sizeindex===sizeindex
            );
            if(index===-1){
                cachedcart.push({id:itemId,sizeindex:sizeindex,quantity:1});
                client.set(`user:${userId}`,JSON.stringify(cachedcart),"EX",60);
            }
            else{
            cachedcart[index].quantity+=1
            client.set(`user:${userId}`,JSON.stringify(cachedcart),"EX",60);
            }
        }

        let result = await UserModel.findOneAndUpdate({clerkid:userId,
            "cartdata.id":itemId,
            "cartdata.sizeindex":sizeindex   
        },{$inc : {"cartdata.$.quantity":1}},{new:true})

        if(!result){
          result = await UserModel.findOneAndUpdate({clerkid:userId},{$push:{cartdata:{
                id:itemId,
                quantity:1,
                sizeindex:sizeindex
            }}},{new:true});
        }

        if (!result) {
    return res.status(404).json({ success: false, message: "User not found" });
}

        await client.set(`user:${userId}`, JSON.stringify(result.cartdata),"EX",60);
        return res.status(200).json({ success: true });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//remove from cart
let removefromcart = async (req, res) => {
    try {
        let { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ success: false });
        }

        let { itemId, sizeindex } = req.body;
        if (!itemId || sizeindex === undefined || sizeindex === null) {
            return res.status(400).json({ success: false });
        }

        // Step 1: Check cache first
        let cached = await client.get(`user:${userId}`);
        let cartdata;

        if (cached) {
            cartdata = JSON.parse(cached);
        } else {
            // Step 2: If no cache, fetch from DB
            let userdata = await UserModel.findOne({ clerkid: userId });
            if (!userdata) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            cartdata = userdata.cartdata;
        }

        // Step 3: Check item actually exists in cart
        let itemIndex = cartdata.findIndex(
            (item) => item.id === itemId && item.sizeindex === sizeindex
        );
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // Step 4: Remove item from cart and update cache immediately
        cartdata.splice(itemIndex, 1);
        await client.set(`user:${userId}`, JSON.stringify(cartdata), "EX", 60);

        // Step 5: Update DB in background
        UserModel.findOneAndUpdate(
            { clerkid: userId },
            { $pull: { cartdata: { id: itemId, sizeindex: sizeindex } } },
            { new: true }
        ).catch((err) => console.error("Background MongoDB update failed:", err));

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//updatecart
let updatecart = async(req,res)=>{
    try{
         let {userId} = getAuth(req);
        if(!userId){
            return res.status(401).json({
               success:false 
            })
        }
        let {itemId,sizeindex,quantity} = req.body;
        if(!itemId || sizeindex === undefined || sizeindex === null || !quantity){
            return res.status(404).json({
                success:false
            });
        }
        let cartdata;
        let cached = await client.get(`user:${userId}`);

        if(cached){
            cartdata = JSON.parse(cached);
        }
        else{
             let userdata = await UserModel.findOne({clerkid:userId});
    if (!userdata) return res.status(404).json({ success: false, message: "User not found" });
    cartdata = userdata.cartdata;
        }

        let itemIndex = cartdata.findIndex((item)=>item.id === itemId && item.sizeindex === sizeindex
        );

        if(itemIndex===-1){
            return res.status(404).json({
                success:false
            });
        }

        cartdata[itemIndex].quantity = quantity;
        await client.set(`user:${userId}`,JSON.stringify(cartdata),"EX",60);
        UserModel.findOneAndUpdate(
            { clerkid: userId, "cartdata.id": itemId, "cartdata.sizeindex": sizeindex },
            { $set: { "cartdata.$.quantity": quantity } }
        ).catch((err) => console.error("Background MongoDB update failed:", err));
        return res.status(200).json({ success: true });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//getorders
let getorders = async (req,res)=>{
    try{
        let {userId} = getAuth(req);
        if(!userId){
            return res.status(401).json({
                success:false
            });
        }
        let orders = await OrderModel.find({clerkId:userId});
        return res.status(200).json({
            success:true,
            orders:orders
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
//stripepayment
let stripepayment = async(req,res)=>{
    try{
        let {userId} = getAuth(req);
        if(!userId){
            return res.status(401).json({
                success:false,
            })
        }
        let user = await UserModel.findOne({clerkid:userId});
        let {deliveryinfo,cartdata} = req.body;
        let line_items = cartdata.map((element)=>({
            price_data:{
                currency:"KES",
                product_data:{
                    names:`${element.name} Size - ${element.size}`,
                    image:[element.image[0]]
                },
                unit_amount:Math.round(element.price*100)
            },
            quantity:element.quantity
        }));

        let session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            line_items:line_items,
            customer_email:user.email,
            success_url:"/",
            cancel_url:"/",
            metadata:{
            first_name:deliveryinfo.first_name,
            last_name:deliveryinfo.last_name,
            email:deliveryinfo.email,
            street:deliveryinfo.street,
            city:deliveryinfo.city,
            zipcode:deliveryinfo.zipcode,
            state:deliveryinfo.state,
            country:deliveryinfo.country,
            phone:deliveryinfo.phone,
            clerkId:userId
            }
        });

        return res.status(200).json({
            success:true,
            url:session.url
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//stripewebhook
let stripewebhook = async(req,res)=>{
    try{
        let signature = req.headers["stripe-signature"];
        let event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_SIGNING_KEY);
        
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const clerkId = session.metadata.clerkId;
            let user = await UserModel.findOne({clerkid: clerkId});
            
            if (user && user.cartdata.length > 0) {
                let order = new OrderModel({
                    clerkId: clerkId,
                    cartdata: user.cartdata,
                    payment_method: "Stripe"
                });
                await order.save();
                
                await UserModel.findOneAndUpdate({clerkid: clerkId}, {cartdata: []});
                await client.del(`user:${clerkId}`);
            }
        }
        return res.status(200).send("Webhook received");
    }
    catch(error){
        console.error("Stripe Webhook Error:", error);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }
}

//mpesapyament
let mpesapyament = async(req,res)=>{
    try{
         let { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ success: false });
        }

        let user = await UserModel.findOne({ clerkid: userId });
        let { deliveryinfo, cartdata } = req.body;
        let totalamount = cartdata.reduce((total, item) => total + (item.price * item.quantity), 0) * 100;

        let response = await paystack.transaction.initialize({
            email:user.email,
            amount:totalamount,
            currency:"KES",
            channels:["mobile_money"],
            callback_url:"http://localhost:5173",
            metadata:{
                first_name: deliveryinfo.first_name,
                last_name: deliveryinfo.last_name,
                phone: deliveryinfo.phone,
                address: `${deliveryinfo.street}, ${deliveryinfo.city}`,
                clerkid:userId
            }
        });

        if(response.status){
            return res.status(200).json({
                success:true,
                url:response.data.authorization_url
            });
        }
        else{
            throw new Error(response.message);
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//mpesawebhook
let mpesawebhook = async(req,res)=>{
    try{
        const secret = process.env.PAYSTACK_SECRET_KEY;
        const hash = crypto.createHmac('sha512', secret)
                           .update(JSON.stringify(req.body))
                           .digest('hex');
        if (hash !== req.headers['x-paystack-signature']) {
            return res.status(401).send('Invalid signature');
        }
        let event = req.body;
        if(event.event === "charge.success"){
            const { metadata } = event.data;
            let clerkId = metadata.clerkid;
            
            let user = await UserModel.findOne({clerkid: clerkId});
            if (user && user.cartdata.length > 0) {
                let order = new OrderModel({
                    clerkId: clerkId,
                    cartdata: user.cartdata,
                    payment_method: "M-Pesa/Paystack"
                });
                await order.save();
                
                await UserModel.findOneAndUpdate({clerkid: clerkId}, {cartdata: []});
                await client.del(`user:${clerkId}`);
            }
        }
        return res.status(200).send("Webhook received");
    }
    catch(error){
        console.error("Paystack Webhook Error:", error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = {clerkwebhook,getproducts,getcart,removefromcart,addtocart,updatecart,stripepayment,stripewebhook,mpesapyament,mpesawebhook,getorders}