let express = require("express");
let userRoutes = express.Router();
let {requireAuth} = require("@clerk/express");

module.exports={userRoutes};    