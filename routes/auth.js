const express=require("express")
const userModel=require("../models/user")
const cors=require("cors")
const jwt=require("jsonwebtoken")
const protectroute=require("./nik")
const bcrypt=require("bcrypt");
const jwt_key="jdfbvknkinfvnon"
useRouter=express.Router();
useRouter.use(cors())
useRouter.use(express.urlencoded({ extended: true}))
useRouter.post('/signup',async (req,res)=>{
    console.log(req.body)
    console.log(req.name)
    try{
    const user = await userModel.create(req.body);
    console.log(user)
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



module.exports=useRouter;






