const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

});

let orderModel = mongoose.model("order",orderSchema);
module.exports={orderModel}