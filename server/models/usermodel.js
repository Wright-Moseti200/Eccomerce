let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    clerkid:{type:String,unique:true,index:true},
    email:{type:String,unique:true},
    profile_pic:{type:String},
    username:{type:String,sparse:true},
    cartdata:[{type:Object}]
},{timestamps:true});

let UserModel = mongoose.model("User",userSchema);
module.exports = {UserModel};