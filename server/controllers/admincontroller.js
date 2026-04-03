const { OrderModel } = require("../models/ordermodel");
const { ProductModel } = require("../models/productmodel");

//get products
let getproducts = async (req,res)=>{
    try{
        let products = await ProductModel.find();
        if(!products.length){
            return res.status(404).json({
                success:false
            });
        }
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

//update order status
let updatestatus = async(req,res)=>{
    try {
        let {id, newStatus}= req.body;
        if(!id||!newStatus){
            return res.status(400).json({
                success:false,
                message: "id and newStatus are required"
            });
        }
        await OrderModel.findByIdAndUpdate(id,{status:newStatus});
        return res.status(200).json({
            success:true
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//upload images
let uploadimages = (req,res)=>{
    try {
        if(!req.files || req.files.length === 0){
            return res.status(400).json({
                success:false,
                message:"no files uploaded"
            });
        }
        let urls = req.files.map((file)=>file.path);
        return res.status(200).json({
            success:true,
            urls:urls
        });
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//add products
let addproducts = async(req,res)=>{
    try {
        let {name,description,price,images,category,subcategory,sizes,bestseller} = req.body;
        if(!name||!description||!price||!images||!category||!subcategory||!sizes||bestseller===undefined){
            return res.status(400).json({
                success:false,
                message: "Missing required fields"
            });
        }
        let newproduct = new ProductModel({
            name:name,
            description:description,
            price:price,
            image:images,
            category:category,
            subCategory:subcategory,
            sizes:sizes,
            bestseller:bestseller
        });
        await newproduct.save();
        return res.status(200).json({
            success:true,
            message:"Data added successfully"
        });
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


//delete products
let deleteproduct = async(req,res)=>{
    try {
        let {id}= req.body;
        if(!id){
            return res.status(400).json({
                success:false,
                message: "id is required"
            });
        }
        await ProductModel.findByIdAndDelete(id);
        return res.status(200).json({
            success:true
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//get all orders
let getallorders = async(req,res)=>{
    try {
        let orders = await OrderModel.find({});
        return res.status(200).json({
            success:true,
            orders:orders
        });
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = { getproducts, updatestatus,uploadimages,addproducts,deleteproduct, getallorders}