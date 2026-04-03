let express = require("express");
let userRoutes = express.Router();
let {requireAuth} = require("@clerk/express");
const { stripepayment, getproducts, getcart, addtocart, removefromcart, updatecart, mpesapyament, mpesawebhook, getorders } = require("../controllers/usercontroller");

userRoutes.get("/products", getproducts);
userRoutes.get("/cart", requireAuth(), getcart);
userRoutes.post("/addtocart", requireAuth(), addtocart);
userRoutes.post("/removefromcart", requireAuth(), removefromcart);
userRoutes.post("/updatecart", requireAuth(), updatecart);
userRoutes.get("/orders", requireAuth(), getorders);
userRoutes.post("/stripepayment", requireAuth(), stripepayment);
userRoutes.post("/mpesapayment", requireAuth(), mpesapyament);
userRoutes.post("/mpesawebhook", mpesawebhook);

module.exports={userRoutes};