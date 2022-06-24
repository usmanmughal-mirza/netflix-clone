const router=require("express").Router();
const User=require("../models/User");
const CryptoJS=require("crypto-js");
const verify=require("../middlewares/verifyToken");



// UPDATE ------------------------------------------------
router.put("/:id",verify,async(req,res) =>{
    // req.user contains info id,isAdmin.we stored at middleware function.

 // if both ids are same..user who was login and user who wants to update must be same
//  user or admin can update  

    if (req.user.id === req.params.id || req.user.isAdmin) {
    //    if user want to update password 
        if(req.body.password){
            req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString();
        } 
  
        try {
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{
                new:true
            });
          return  res.status(200).json(updatedUser);
            
        } catch (error) {
            return res.status(500).json({message:error.message})
            
        }


    }

    
//    if ids not match..thats means user are not true
    else {
        return res.status(403).json("you can only update your account")
    }
})


// DELETE ---------------------------------------------

router.delete("/:id",verify,async(req,res) =>{
    const {id}=req.params;
    if(req.user.id === req.params.id || req.user.isAdmin){

        try {
            await User.findByIdAndDelete(id);
            return res.status(200).json("user has been deleted");
            
        } catch (error) {
            return res.status(500).json({message:error.message})
            
        }

    }
    // else ---------------ids not match
    else{
        return res.status(403).json("you can only delete your account")
    }
})


// GET -----------------------------------------
// -----------------------------------------------------
// --------------------------------------

router.get("/find/:id",async(req,res) =>{
    const {id}=req.params;
   
        try {
         const user=await User.findById(id);
         if(!user){
             return res.status(404).json("user not found with this id")
         }
         const {password,...info}=user._doc;
            return res.status(200).json(info);
            
        } catch (error) {
            return res.status(500).json({message:error.message});       
    }
})

 
// GET ALL -----------------------------------
router.get("/",verify,async(req,res) =>{
    // new is query name 

    const query=req.query.new;

    // we only fetch  users if we are admin 

    if( req.user.isAdmin){
 
        try {
         const users= query ? await User.find().sort({_id:-1}).limit(5):await User.find();

         if(!users){
            return res.status(404).json("users not found in db");
        }

            return res.status(200).json(users);
            
        } catch (error) {
            return res.status(500).json({message:error.message})
            
        }

    }
    // else ---------------ids not match  
    else{
        return res.status(403).json("you are not allowed..only admin see all users")
    }
})


// GET USER STATS --------------------------------
// check amount of users in different months ----

router.get("/stats",async(req,res) =>{
// queries used ---------------
// $project: Reshapes each document in the stream, such as by adding new fields or removing existing fields. For each input document, outputs one document. 
// $group: Groups input documents by a specified identifier expression and applies the accumulator expression(s), if specified, to each group

 try {
     const data=await User.aggregate([
         {
            //  here $project are add new field, month 
            // only return month field and send to group 
             $project:{
                 month:{$month:'$createdAt'}
             }

         },{
    // _id is the month of user 
    // total is the amount of users in that month  
    // $sum:Returns a sum of numerical values        
             $group:{
                 _id:"$month",
                 total:{$sum:1}
             }
         }
     ])
     if(!data){
         return res.status(404).json("user dont exist in any month")
     }

     return res.status(200).json(data)
 } catch (error) {
     return res.status(500).json({message:error.message})
 }
 
})

module.exports=router;