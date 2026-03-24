let {Webhook} = require("svix");
require("dotenv").config();
let stripe = require("stripe")
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
        const cachekey = "cart";
        let data = await client.get(cachekey);
        if(data){
            return res.status(200).json({
                success:true,
                cart
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//addtocart
let addtocart = (req,res)=>{
    try{
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//removefromcart
let removefromcart = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//updatecart
let updatecart = (req,res)=>{
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
let stripepayment = (req,res)=>{
    try{

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

module.exports = {clerkwebhook,getproducts,getcart,removefromcart,addtocart,updatecart,stripepayment,stripewebhook,mpesapyament,mpesawebhook}