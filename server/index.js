let express = require("express");
let app = express();
let cors = require("cors");
let ratelimit = require("express-rate-limit");
let port = 4000;

let limit = ratelimit({
    windowMs:10*60*1000,
    max:100
});

app.use([cors(),limit]);

app.use('api/user');
app.use('api/admin');
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});