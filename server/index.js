let express = require("express");
let app = express();
let cors = require("cors");
let ratelimit = require("express-rate-limit");
const { mongodb } = require("./config/mongodb");
let {clerkMiddleware} = require("@clerk/express");
const { clerkwebhook, stripewebhook } = require("./controllers/usercontroller");
const { userRoutes } = require("./routes/userroutes");
const { adminroutes } = require("./routes/adminroutes");
require("dotenv").config();
let port = process.env.PORT || 4000;
let limit = ratelimit({
    windowMs:10*60*1000,
    max:50
});

app.use(cors());

app.post("/clerkwebhook",express.raw({type:"application/json"}),clerkwebhook);
app.post("/stripewebhook",express.raw({type:"application/json"}),stripewebhook);

app.use([limit,express.json()]);
app.use(clerkMiddleware());
app.use("/api/users",userRoutes);
app.use("/api/admin",adminroutes);
(async()=>{
    await mongodb();
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });
})();