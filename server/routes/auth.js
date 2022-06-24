const router=require("express").Router();
const User=require("../models/User");
const CryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken")

// sign up ---------------------------------------------
// ----------------------------------------------------
// -----------------------------------------------------

router.post("/register",async(req,res) =>{
    console.log(req.body);
    const {password,email,username}=req.body;
    const  hashPassword=CryptoJS.AES.encrypt(password,process.env.SECRET_KEY).toString();

    // check user 
    const checkUser=await User.findOne({email});
if(checkUser){
    return res.status(404).json("user already exists")
}

    try {
        const user=new User({
            username,
            password:hashPassword,
            email  
        })
         
        const result=await user.save();
       return res.status(201).json(result);
    } catch (error) {
      return  res.status(500).json({error:error.message})
    }
})

// login ----------------------------------------------
// ---------------------------------------------------
// ----------------------------------------------------

router.post("/login",async(req,res) =>{
    
    const {email}=req.body;
try {
    // check email ------------------------------
    const user=await User.findOne({email});
    // if user not exist 
    if(!user){
        return res.status(401).json("email not valid");
      }

    // dcrypt db  password ------------------------------

    const bytes=CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY);
    const dbPassword=bytes.toString(CryptoJS.enc.Utf8);

    // compare user password and db password ---------
    if(dbPassword !== req.body.password){
        return res.status(401).json("wrong password")
    }

    // create jsonwebtoken ----------------
    // jwt contains our id and admin properties  
    
    const accessToken=await jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY,{
        expiresIn:'5d'
    })    
    // descructure password and other info and send response 
    // without password 

    const {password,...other}=user._doc;

    // if password is true ---
    return res.status(200).json({...other,accessToken});
} catch (error) {
   return res.status(500).json({message:error.message})
} 
})
module.exports=router;