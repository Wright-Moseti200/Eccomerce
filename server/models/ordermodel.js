const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    clerkId:{type:String,required:true},
    cartdata:{type:Array,required:true},
    payment_method:{type:String,required:true},
    date:{type:String,required:true,default:Date.now()},
    status:{type:String,required:true,default:"Processing"}
},{timestamps: true});

let OrderModel = mongoose.model("order",orderSchema);
module.exports={OrderModel}