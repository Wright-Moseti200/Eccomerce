let express = require("express");
let userRoutes = express.Router();
let {requireAuth} = require("@clerk/express");
const { stripepayment, getproducts } = require("../controllers/usercontroller");

userRoutes.get("/products",getproducts)
userRoutes.post("/stripepayment",requireAuth(),stripepayment);
module.exports={userRoutes};    