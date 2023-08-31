
const mongoose=require("mongoose")
const emailvalidator=require("email-validator")
const bcrypt=require("bcrypt");
const {link} = require("../keys");




(async function(){

  const response = await mongoose.connect(link);
  console.log(response)
  console.log("mongodb connected");
  


})();
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"it is required"],

    },
    email:{
        type:String,
        required:[true,"email it is required"],
        unique:[true,"you are already sign up"],
        validate:[function(){
            return emailvalidator.validate(this.email)
        },"enter right email"]

    },
    Password:{
        type:String,
        required:[true,"password is required"],

    },
    pic:{
       type: String,
       default:"https://res.cloudinary.com/djobbmy33/image/upload/v1693216778/WIN_20210510_17_10_42_Pro_s5xam1.jpg"

    },
    follower:[{type:mongoose.Schema.ObjectId,ref:"userModel"}],
    following:[{type:mongoose.Schema.ObjectId,ref:"userModel"}],
    
})
userSchema.pre('save',async function(){
    let salt=await bcrypt.genSalt();
    let hashedString= await bcrypt.hash(this.Password,salt);
  this.Password=hashedString
})




const userModel=mongoose.model("userModel",userSchema)

module.exports=userModel