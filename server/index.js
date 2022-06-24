require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const authRoute=require("./routes/auth"); 
const userRoute=require("./routes/users");
const moviesRoute=require("./routes/movies"); 
const listRoute=require("./routes/lists");
const bodyParser=require("body-parser");
const cors=require("cors")
app.use(cors({
    //* means allow from all origin(localhost) 
    origin:"*"  
}))
     
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true, 
    useUnifiedTopology:true,   
    
})
.then( () =>{
    console.log('connected to mongodb');
})
.catch( (err) =>{
    console.log(err.message);
})

app.use(express.json());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

// routes -----------------------
app.get("/" ,(req,res) =>{
res.send("welcome to home page")
})
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies",moviesRoute);
app.use("/api/lists",listRoute);

app.listen(8000,() =>{
    console.log('listening...)');
})