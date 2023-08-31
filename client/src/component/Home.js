import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';
import { userContext } from '../App';
import { Link } from 'react-router-dom';

export default function Home() {
  const{state,dispatch}=useContext(userContext)
  const[data,setData]=useState([])
  const getData=async ()=>{
 const n= await axios.get("/post/allposts");
 console.log(n)

setData(n.data.posts);

 
 

  }
  useEffect( ()=>{
getData()
  },[])
  
  const likepost  =async (id)=>{
    
    let dat={
       postId:id
    }

    
   const m= await axios.patch("/post/like" ,dat);
   console.log(m.data.data)
   const l=data.map(item=>{
    if(item._id==m.data.data._id){
      return m.data.data;

    }
    else{
      return item;

    }

   })
   setData(l)
    
   
    
  }

  const unlikepost  =async (id)=>{
    
    let dat={
       postId:id
    }

    
   const m= await axios.patch("/post/unlike" ,dat);
   console.log(m.data.data)
   const l=data.map(item=>{
    if(item._id==m.data.data._id){
      return m.data.data;


    }
    else{
      return item;

    }

   })
   setData(l)
    
   
    
  }
  const makecomment=async (msg,id)=>{

    const dat={
      postId:id,
      text:msg
    }
    const m= await axios.patch("/post/comment" ,dat);
    console.log(m)
    const l=data.map(item=>{
     if(item._id==m.data.data._id){
       return m.data.data;
 
 
     }
     else{
       return item;
 
     }
 
    })
    setData(l)
   




  }
  const deletePost=(postId)=>{
   const m= axios.delete(`/post/delete/${postId}`);
   const l=data.filter(item=>{
    if(item._id!=m.data.data._id){
      return m.data.data;


    }
    

   })
   setData(l)
  




  
  }


    
  

  return (
    <div className="home">
      {
        data.map(item=>(
          <div className="card home-card">
             <i class="material-icons" style={{float:'right'}} onClick={()=>{deletePost(item._id)}}>delete</i>
      
   <h5>
  {state && item.postedBy && (
    <Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile "}>
      {item.postedBy.name}
    </Link>
  )}
</h5>

   <div className="card-image">
    <img  src={item.photo}></img>

   </div>
   <div classname="card-content">
   <i className="material-icons" style={{color:"red"}}>favorite</i>
   
   {
    item.likes.includes(state._id)?
    
   <i className="material-icons" onClick={()=>{unlikepost(item._id)}}>thumb_down</i>:<i className="material-icons" onClick={()=>{likepost(item._id)}}>thumb_up</i>

   }

   <h6>{item.likes.length} likes</h6>
    <h6>{item.title}</h6>
    <p>{item.body}</p>
    {
      item.comment.map(record=>
        
          <h6><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>{record.text}</h6>
        
      )
    }
   
    
    
  
    <form onSubmit={(e)=>{
      e.preventDefault()
      
      
      makecomment(e.target[0].value,item._id)
      
    }}>
    <input type="text" placeholder="add a comment"></input>
    

    </form>
   

   </div>


   </div>

        )

        )
      }
   
  
   </div>
   
  )
}
