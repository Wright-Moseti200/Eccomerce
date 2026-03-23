//clerkwebhook
let clerkwebhook = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//getproducts
let getproducts = (req,res)=>{
    try{

    }
    catch(error){
       return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//getcart
let getcart = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//addtocart
let addtocart = (req,res)=>{
    try{
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//removefromcart
let removefromcart = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//updatecart
let updatecart = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//stripepayment
let stripepayment = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//stripewebhook
let stripewebhook = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//mpesapyament
let mpesapyament = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//mpesawebhook
let mpesawebhook = (req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = {clerkwebhook,getproducts,getcart,removefromcart,addtocart,updatecart,stripepayment,stripewebhook,mpesapyament,mpesawebhook}