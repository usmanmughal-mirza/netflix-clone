const router=require("express").Router();
const Movie=require("../models/Movie");
const verify=require("../middlewares/verifyToken");


// CREATE a new movie ------------------------------
// ------------------------------------------------
// ------------------------------------------------

router.post("/",verify,async(req,res) =>{
    const data=req.body;
    // only admin can create movie ----------
if (req.user.isAdmin) {
    const newMovie=new Movie(data);

    try {
        const savedMovie=await newMovie.save();
        return res.status(201).json(savedMovie);
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}

// if user is not admin ------
else {
    return res.status(403).json("you are not admin..so not allowed")
}
});

// UPDATE -----------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

router.put("/:id",verify,async(req,res) =>{
    const data=req.body;
    const {id}=req.params;
    // only admin can update movie ----------
if (req.user.isAdmin) {
    try {
        const updatedMovie=await Movie.findByIdAndUpdate(id,{
            $set:data
        },{ 
            new:true
        });
        return res.status(200).json(updatedMovie);
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}

// if user is not admin ------
else {
    return res.status(403).json("you are not admin..so not allowed")
}
});


// DELETE -------------------------------------------------
// ---------------------------------------------------------
// ----------------------------------------------------------

router.delete("/:id",verify,async(req,res) =>{
    
    const {id}=req.params;
    // only admin can delete movie ----------
if (req.user.isAdmin) {
    try {
       await Movie.findByIdAndDelete(id)
        return res.status(200).json("movie deleted");
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}
// if user is not admin ------
else {
    return res.status(403).json("you are not admin..so not allowed")
}
});


// GET ------------------------------------------
// -------------------------------------------------
// ----------------------------------------------------
// get specific movie 
router.get("/find/:id",verify,async(req,res) =>{
    const {id}=req.params;
    try {
      const movies=await Movie.findById(id)
        return res.status(200).json(movies);
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
});

// GET -----------------------------------------------
// ---------------------------------------------------
// get random movie for Header of app 
router.get("/random",verify,async(req,res) =>{
    // $match :Filters the document stream to allow only matching documents to pass unmodified into the next pipeline stage. $match uses standard MongoDB queries. For each input document, outputs either one document (a match) or zero documents (no match).
//    $sample : Randomly selects the specified number of documents from its input 

    // get query ?type=series or movies
    const type=req.query.type;
    let movie;
    try {

     if (type==='series') {
         movie=await Movie.aggregate([
            //  be dafault isSeries is false ..so check movies whose isSeries is true
             {$match:{isSeries:true}},
            // $sample: randomly selects any 1 movie 
             {$sample:{size:1}}
         ])
         
     } else {
        //  if type is not series .. then type=movie
        movie=await Movie.aggregate([
            // isSeries false means its movie
             {$match:{isSeries:false}},
            // $sample: randomly selects any 1 movie 
             {$sample:{size:1}}
         ])
     }
        return res.status(200).json(movie);
    } 
    // second block --
    catch (error) {
        return res.status(500).json({message:error.message})
    }
});


// GET ALL-------------------------------------------------
// ---------------------------------------------------------
// ----------------------------------------------------------

router.get("/",verify,async(req,res) =>{
    
    const {id}=req.params;
    // only admin can GET movie ----------
if (req.user.isAdmin) {
    try {
      const movies= await Movie.find(id)
    //   reverse() send use last data to first..reverse data ..result
        return res.status(200).json(movies.reverse());
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}
// if user is not admin ------
else {
    return res.status(403).json("you are not admin..so not allowed")
}
});

module.exports=router;