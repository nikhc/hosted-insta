const mongoose=require("mongoose")


const {link} = require("../keys");





(async function(){

  const response = await mongoose.connect(link);
  console.log(response)
  console.log("mongodb connected");
  


})();

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"pls entered title"]
    },
    body:{
        type:String,
        required:[true,"pls bro enter body"]
    },
    photo:{
        type:String,
       required:[true,"pls bro enter photo"]
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"userModel",
     
       
    },
    likes:[{type:mongoose.Schema.ObjectId,ref:"userModel"}],
    comment:[{text:{type:String},postedBy:{type:mongoose.Schema.ObjectId,ref:"userModel"}}],
    

},{
    timestamps:true
})
postSchema.pre(/^find/,function(next){
    this.populate({
        path:"postedBy",
        select:"name email"
    })
 
    next()

})




const postModel=mongoose.model("postModel",postSchema)

module.exports=postModel