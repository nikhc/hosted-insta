const express=require("express")
const postModel=require("../models/post")
const jwt=require("jsonwebtoken")
const protectroute=require("./nik");
const { hashSync } = require("bcrypt");
const userModel = require("../models/user");

const postRouter=express.Router();
postRouter.use(protectroute)

postRouter.post("/createpost",async function(req,res){
    try{
        console.log(req.body)
        const m=req.body;
        m["postedBy"]=req.id;
        

        const nik=  await postModel.create(m)
        
        console.log(nik)
        res.json({
            data:"image uploadded"

        })
       


    }
    catch(err){
        res.send(err.message)
    }
 



    
})


postRouter.get("/allposts", async function(req,res){
    try{
        let data=   await postModel.find();
        console.log(data)

 res.json({
    posts:data
 })

    }

    catch(err){
        res.status(500).json({
            data:"something is error"
        })
    }


})


postRouter.get("/myallposts", async function(req,res){
    try{
        let data=   await postModel.find({postedBy:{$in:req.user.following}});
        console.log(data)

 res.json({
    posts:data
 })

    }

    catch(err){
        res.status(500).json({
            data:"something is error"
        })
    }


})
postRouter.get("/mypost",async function(req,res){
    console.log(req.id)
    try{
       const m=  await postModel.find();
       
      const l= m.filter((a)=>a.postedBy._id==req.id)
      console.log(l)
       res.json({
        data:l
       })


    }
    catch(err){
        res.json({
            data:err.message
        })

    }
})


postRouter.patch('/like', async (req, res) => {
    try {
        console.log(req.body.postId)
      const postId = req.body.postId;
      const userId = req.id; // Assuming you have the authenticated user's ID
      const updatedPost = await postModel.findByIdAndUpdate(
        postId,
        { $push: { likes: userId } },
        { new: true } // Return the updated document
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json({
        data: updatedPost
      });
    } catch (err) {
      res.status(500).json({
        err: "Internal server error"
      });
    }
  });
  


 postRouter.patch('/unlike',async (req,res)=>{

    try {
        const postId = req.body.postId;
        const userId = req.id; // Assuming you have the authenticated user's ID
        const updatedPost = await postModel.findByIdAndUpdate(
          postId,
          { $pull: { likes: userId } },
          { new: true } // Return the updated document
        );
    
        if (!updatedPost) {
          return res.status(404).json({ error: 'Post not found' });
        }
    
        res.json({
          data: updatedPost
        });
      } catch (err) {
        res.status(500).json({
          err: "Internal server error"
        });
      }
 



 })

 postRouter.patch('/comment', async (req, res) => {
  try {
    const postId = req.body.postId; // Assumiidng postId is sent in the request body
    const commentText = req.body.text; // Assuming commentText is sent in the request body
    const postedBy = req.id; // Assuming you have authentication and can access the user's ID

    const comments = {
      text: commentText,
      postedBy: postedBy
    };

    // Update the post by pushing the new comment to the comment array
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { $push: { comment: comments } },
      { new: true }
    ).populate({
      path:'comment.postedBy',
      select :"name"
          }) // Populate the newly added comment's postedBy field

    res.json({ data: updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


postRouter.delete("/delete/:postId",async (req,res)=>{
 
   let id=req.params.postId;
   console.log(id)
   console.log(id)
   console.log(id)
   console.log(id)
   console.log(id)
   console.log(id)


 
  
  
try{
  
  const l=await postModel.findById(id);
  console.log(l+"ghvhgvhgvhgvhgvghv")
  const h=l.postedBy._id.toString();
  console.log(h)
  console.log(req.id==h)
  console.log(id);
  console.log(h)
  if(req.id==h){
  const m= await postModel.findByIdAndDelete(id);
  console.log(m)
 
  res.json({
    data:m
  })

  }
  else{
   res.json({
    error:"this is not your post you cant delete it "
   })
  }
}
catch(err){
  res.status(500).json({
    error:err.message
  })
}
  
  
})



postRouter.get("/user/:id",async (req,res)=>{
  try{
    
  
    const nik= await userModel.findOne({_id:req.params.id}).select("-Password")
    
    if(nik){
    const post=await postModel.find({postedBy:req.params.id}).populate("postedBy","id");
    
    console.log("khjbdsjhvbhjbdsv")
    res.json({
     user:nik,
     data:post
    })
   }
    else{
     res.json({
       error:"plas enter write cre"
     })
    
    }
  }
  

  catch(err){
    res.json({
      data:err.message
    })
  }
 



 
}
)
postRouter.patch("/follow",async (req,res)=>{
  try{
    console.log(req.body.userId)
    console.log(req.body.userId)

    console.log(req.body.userId)
    console.log(req.body.userId)

    
  
    const updatedPost = await userModel.findByIdAndUpdate(
      req.body.userId,
      { $push: { follower: req.id } },
      { new: true }
    ).select("-Password")
   
   const uupdatedPost = await userModel.findByIdAndUpdate(
    req.id,
    { $push: { following:req.body.userId  } },
    { new: true }
  ).select("-Password")
  res.json({
    data:uupdatedPost,
    datta:updatedPost
  })
   
    }
  
  

  catch(err){
    res.json({
      data:err.message
    })
  }
 



 
}
)
postRouter.patch("/unfollow", async (req, res) => {
  try {
    const updatedPost = await userModel.findByIdAndUpdate(
      req.body.userId,
      { $pull: { follower: req.id } },
      { new: true }
    ).select("-Password");

    const uupdatedPost = await userModel.findByIdAndUpdate(
      req.id,
      { $pull: { following: req.body.userId } },
      { new: true }
    ).select("-Password");

    // Send a single response with both updated user data
    res.json({
    
        data: uupdatedPost,
        datta: updatedPost
      
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

postRouter.patch("/updatepic/:id",async (req,res)=>{
  console.log(req.params.id)
  const m={
      pic:req.body.url
  }
  console.log(req.body.url)
 const t= await userModel.findOneAndUpdate({_id:req.params.id},m,{new:true})
 res.json({
  data:t
 })

})















 
 








module.exports=postRouter

