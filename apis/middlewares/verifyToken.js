const jwt = require("jsonwebtoken");



// token verification middleware
const verifyToken=(req,res,next)=>{
    // get token from headers of req
    let token=req.headers.authorization;
    // if no token
    if(token===undefined){
      res.send({message:"Unauthorized access....Please login"})
    }
    // if token is there but it is expired
    try{
    let decodedToken=jwt.verify(token,'abcdef')
    // call next middleware
    next();
    }
    catch(err){
    res.send({message:"Invalid token...plz relogin"})
    }
  }                      
  
  
  module.exports=verifyToken;