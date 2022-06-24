const router=require("express").Router();
const List=require("../models/List");
const verify=require("../middlewares/verifyToken");

// CREATE ------------------------------------------
// -------------------------------------------------
// -------------------------------------------------

router.post("/",verify,async(req,res) =>{
    const data=req.body;
    // only admin can create new list ---
if (req.user.isAdmin) {
    const newList=new List(data);

    try {
        const savedList=await newList.save();
        return res.status(201).json(savedList);
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
// if user is not admin -------------
else {
    return res.status(403).json("you are not admin so not allowed")
}
})


// UPDATE ------------------------------------------
// -------------------------------------------------
// -------------------------------------------------

router.put("/:id",verify,async(req,res) =>{
    const data=req.body;
    const {id}=req.params;

if (req.user.isAdmin) {

    try {
        const updatedList=await List.findByIdAndUpdate(id,data,{
            new:true
        });
        return res.status(200).json(updatedList);
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
// if user is not admin -------------
else {
    return res.status(403).json("you are not admin so not allowed")
}
})


// DELETE ------------------------------------------
// -------------------------------------------------
// -------------------------------------------------

router.delete("/:id",verify,async(req,res) =>{
    const {id}=req.params;
if (req.user.isAdmin) {
    try {
        await List.findByIdAndDelete(id);
        return res.status(200).json("list has been deleted")
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
// if user is not admin -------------
else {
    return res.status(403).json("you are not admin so not allowed")
}
})


// GET --------------------------------------------
// --------------------------------------------------
// ----------------------------------------------------

router.get("/",verify,async(req,res) =>{
    //  ?type=''  ?genre=''
    const {type,genre}=req.query;
    let list=[];
try {
    // if we have  type query then start this block 
    // type=series or type=movie 

    if(type){
        //  if we have type='' and also genre=crime or else.. then this 
        if(genre){
            list=await List.aggregate([
                // type=movies , genre=crime then return 10 random 
                {$match:{type:type,genre:genre}},
                {$sample:{size:10}}
            ])
        }
          //only type query,no genre,
        else{
            list=await List.aggregate([
                  // type='',no genre, and return 10 random 
                  {$match:{type:type}},
                  {$sample:{size:10}}
            ]) 
        }

    }
    // not type query -------for home page
    else{
        list=await List.aggregate([
            {
                // return us 10 random lists and each list  contains 10 movies ------
                $sample:{ size:10 } 
            }
        ])

    }
return res.status(200).json(list)    
}
 catch (error) {
    return res.status(500).json({message:error.message})
}
})
module.exports=router