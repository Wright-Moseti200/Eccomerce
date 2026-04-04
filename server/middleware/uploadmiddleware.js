let multer = require("multer");
let cloudinary = require("cloudinary").v2
let {CloudinaryStorage} = require("multer-storage-cloudinary");
require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

let storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"Eccomerce_website",
        allowed_formats:["png","jpeg","jpg"]
    }
});

let upload = multer({storage:storage,limits:{fileSize:10*1024*1024}});
module.exports = {upload}