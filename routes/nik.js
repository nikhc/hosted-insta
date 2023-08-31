const jwt=require('jsonwebtoken')
const userModel=require("../models/user");
const { request } = require('express');
const jwt_key="jdfbvknkinfvnon"
async function protectroute(req,res,next){
    try{
        let token;
    if(req.cookies.isLoggedIn){
        console.log(req.cookies);
        token=req.cookies.isLoggedIn
        let payload=jwt.verify(token,jwt_key)
        if(payload){
            console.log('payload token', payload)

            const user=await userModel.findById(payload.payload);
        
            req.id=user.id;
            req.user=user
      
            console.log(req.id);
             
            next();

        }
        else{

            const client=req.get('User-Agent');
            if(client.includes("Mozilla")==true){
                return res.redirect('/login');
            }
            res.json({
                msg:"pls login again"
            })
        }

    }
    else{
        res.send("pls login bhai ")
    }
}
    catch(err){
        res.json({
            msg:err.message
        })
    }
    
}
module.exports=protectroute