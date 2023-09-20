
// Ei1MSyEfZiYVXDh4
const userModel=require("./models/user")
const express=require("express");
const port=process.env.port||5000
const useRouter=require("./routes/auth")
const postRouter=require("./routes/posts")
const path=require("path")


const cookieparser=require('cookie-parser');
const cors=require("cors")



const app=express();




app.use(express.json());
app.use(cookieparser())
app.use("/user",useRouter);
app.use("/post",postRouter)



app.use(express.static('client/build'));

// Catch-all route to serve the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"client", "build", "index.html"))
  
  
});



app.listen(port,()=>{
    console.log("all things are running fine")
})



