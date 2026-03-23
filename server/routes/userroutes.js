let express = require("express");
let userRoutes = express.Router();
let {requireAuth,getAuth} = require("@clerk/express");

module.exports={userRoutes};