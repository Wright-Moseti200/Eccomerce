let express = require("express");
let app = express();
let cors = require("cors");
let ratelimit = require("express-rate-limit");
const { mongodb } = require("./config/mongodb");
let {clerkMiddleware} = require("@clerk/express");
const { clerkwebhook } = require("./controllers/usercontroller");
require("dotenv").config();
let port = process.env.PORT || 4000;
let limit = ratelimit({
    windowMs:10*60*1000,
    max:100
});
app.use(clerkMiddleware());
app.post("/clerkwebhook",express.raw({type:"application/json"}),clerkwebhook);
app.use([cors(),limit,express.json()]);

mongodb();

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});