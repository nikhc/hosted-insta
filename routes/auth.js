const express=require("express")
const userModel=require("../models/user")
const cors=require("cors")
const jwt=require("jsonwebtoken")
const protectroute=require("./nik")
// const sendMail=require("./nodemailer")
const nodemailer = require("nodemailer");
const bcrypt=require("bcrypt");
const jwt_key="jdfbvknkinfvnon"
useRouter=express.Router();
useRouter.use(cors())
useRouter.use(express.urlencoded({ extended: true}))
useRouter.post('/signup',async (req,res)=>{
    console.log(req.body)
    console.log(req.body.name)
    try{
    const user = await userModel.create(req.body);
    console.log(user)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'nikhil23fbd@gmail.com',
          pass: "cpfdmitposeermuu"
        }
        
      });
      console.log("dhjsbjhbdsjhbc");
      console.log("kjfbvkjndksnkndsncldsndocndlskncondslc")

      
      // async..await is not allowed in global scope, must use a wrapper
      
          var Osubject,Otext,Ohtml;
        
              Osubject=`thankyou for signning ${user.name}`
              Ohtml=`<h1> bro welcome</h1>
              name-${user.name}`
              console.log("mnds jh jhsds jbjdsbcjbds")
        
          
          console.log("jai ho")
        // send mil with defined transport object
        const info = await transporter.sendMail({
          from: '"nikhil" <nikhil23fbd@gmail.com>', // sender address
          to: user.email, // list of receivers
          subject: Osubject, // Subject line
          // plain text body
          html: Ohtml // html body
        });
    res.json({
     data:"you are successfully signup"
    })
}
catch(err){
    res.json({
        nik:"galat kuch haau",
        error:err.message
    })
}
 
 })

 useRouter.post("/signin",async (req,res)=>{
    try{
    let data=req.body;
    console.log(data)
    let user= await userModel.findOne({email:data.email});
    
    console.log(user)
    if(user){
        console.log(user)
       const m= await bcrypt.compare(data.Password,user.Password);
       console.log(m)
        if(m){
            let uid=user['_id'];
            let token=jwt.sign({payload:uid},jwt_key);
           
            res.cookie('isLoggedIn',token,{maxAge:1000*60*60*24*7},{httpOnly:true});
             res.json({
                data:user
                
            })

        }
        else{
            return res.json({
                error:'wrong credentisls'
            })

        }


    }
    else{
        return res.json({
            error:'user not match pls enter write credntials'

        })


    }
}
catch(err){
    return res.json({
        message:err.message
    })
}
}
 )
useRouter.get("/chalo",protectroute,(req,res)=>{
    res.json("all godd brother")
})
useRouter.get("/logout",(req,res)=>{
    res.cookie('isLoggedIn'," ",{maxAge:1});

    res.json({
        data:"logout successful"
    })
   
})

 useRouter.post("/forgetPassword", async function (req,res){
    let{email}=req.body;


try{
    const user=await userModel.findOne({email:email});
    if(user){
    const resetToken=user.createResetToken();
    await user.save()
    // set url
    let  resetPasswordLink=`${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`
    let obj={
        resetPasswordLink:resetPasswordLink,
        email:email
    }
    sendMail("resetPassword",obj)
    res.json({
        data:user
    })
    }
    else{
        res.json({
            message:'plas signup'
        })
    }
}
catch(err){
    res.status(500).json({
        message:err.message
    

    })
   
}
})


useRouter.post("/resetPassword/:token",async function (req,res){
    try{
    const token=req.param.token;
    let {Password,confirmPassword}=req.body;
    const user=await userModel.findOne({resetToken:token});
    if(user){
        user.resetpasswordhandler(Password,confirmPassword);
        await user.save();
        res.json({
            msg:"user password changed successfully pls login again"
        })

    }
    else{
        res.json({
            message:"user not found"

        })
    }
   

}
catch(err){
    res.json({
        msg:err.message
    })
}

})


module.exports=useRouter





