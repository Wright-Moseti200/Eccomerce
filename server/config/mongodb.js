let mongoose = require("mongoose");
require("dotenv").config();

let mongodb = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/eccomerce`);
        console.log("Database is connected successfully");
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports={mongodb};