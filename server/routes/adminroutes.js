let express = require("express");
let { getproducts, updatestatus, uploadimages, addproducts, deleteproduct, getallorders } = require("../controllers/admincontroller");
let { upload } = require("../middleware/uploadmiddleware");

let adminroutes = express.Router();

adminroutes.get("/products", getproducts);
adminroutes.get("/allorders", getallorders);
adminroutes.post("/addproducts", addproducts);
adminroutes.post("/deleteproduct", deleteproduct);
adminroutes.post("/updatestatus", updatestatus);
adminroutes.post("/uploadimages", upload.array("images", 10), uploadimages);

module.exports={adminroutes};