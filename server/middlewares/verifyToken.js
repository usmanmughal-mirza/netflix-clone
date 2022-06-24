const jwt=require("jsonwebtoken");
require("dotenv").config();

const verify =async(req,res,next) =>{
    // token send from front end 
    const authHeader=req.headers.token || req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader);

    // if header contains token ------
    if(authHeader){
        // Bearer token123 
        const token=authHeader.split(" ")[1]; 
        console.log(`token is ${token}`);
        
  
        // verify token -------------------------
        // user contains all info stored in jwt.we stored info while creating jwt in login route.e,g isAdmin,id
      await jwt.verify(token,process.env.SECRET_KEY,(err,user) =>{
            // 403 => forbidden
            if(err) res.status(403).json("token is not valid")
            req.user=user; 
            console.log(`error is ${err}`); 
            console.log(`user is ${user}`);
            next();   
        }) 

    }
    // if headers dont contain token property
    else{
        // 401 => not authenticated
return res.status(401).json("you are not authenticated");
    }
}

module.exports=verify;