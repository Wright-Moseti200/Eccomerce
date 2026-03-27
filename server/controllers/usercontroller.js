let {Webhook} = require("svix");
require("dotenv").config();
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
let {getAuth} = require("@clerk/express");
const { UserModel } = require("../models/usermodel");
let Redis = require("ioredis");
const { ProductModel } = require("../models/productmodel");
let client = new Redis();

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
        await client.set("all_products",JSON.stringify(products),{"EX":60});
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
        let data = await client.get(`cart:${userId}`);
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
        await client.set(`cart:${userId}`,JSON.stringify(userdata.cartdata),{"EX":60});
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
        if(!itemId||!sizeindex){
            return res.status(404).json({
                success:false
            });
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
        await client.set(`cart:${userId}`, JSON.stringify(result.cartdata), { EX: 60 });
        return res.status(200).json({ success: true });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//removefromcart
let removefromcart = async(req,res)=>{
    try{
        let {userId} = getAuth(req);
        if(!userId){
            return res.status(401).json({
               success:false 
            })
        }
        let {itemId,sizeindex} = req.body;
        if(!itemId||!sizeindex){
            return res.status(404).json({
                success:false
            });
        }
    let userdata =  await UserModel.findOneAndUpdate({clerkid:userId},{$pull : {cartdata:{id:itemId,sizeindex:sizeindex}}},{new:true})
       await client.set(`cart:${userId}`,JSON.stringify(userdata.cartdata),{"EX":60});
       return res.status(200).json({
        success:true
       });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

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
        if(!itemId||!sizeindex||!quantity){
            return res.status(404).json({
                success:false
            });
        }
      let userdata =   await UserModel.findOneAndUpdate({clerkid:userId,"cartdata.id":itemId,"cartdata.sizeindex":sizeindex},{$set:{"cartdata.$.quantity":quantity}},{new:true});
      await client.set(`cart:${userId}`,JSON.stringify(userdata.cartdata),{"EX":60});
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
let getorders = (req,res)=>{
    try{

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
                success:true,
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
let stripewebhook = (req,res)=>{
    try{
        let stripe =  req.headers["stripe-signature"];
        let signingKey = process.env.
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//mpesapyament
let mpesapyament = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//mpesawebhook
let mpesawebhook = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = {clerkwebhook,getproducts,getcart,removefromcart,addtocart,updatecart,stripepayment,stripewebhook,mpesapyament,mpesawebhook,getorders}