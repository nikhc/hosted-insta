import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { userContext } from '../App'
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const{state,dispatch}=useContext(userContext)
  const[data,setData]=useState([]);
  const[user,setname]=useState({});
 
  console.log(state)
  const {userId}=useParams({})
  const[show,yesshow]=useState(state?!state.following.includes(userId):true)
 
  const getData=async ()=>{
 const n= await axios.get(`/post/user/${userId}`);
 console.log(n)
 


setData(n.data.data);
setname(n.data.user);

 
 

  }
  useEffect( ()=>{
 
  console.log("jhbjvbjbsjdvbkjbdsskvbkdsbvkbdskvbkdsnjv")
getData()

  },[])
  const followUser=async ()=>{
    const m= await axios.patch("/post/follow",{userId})
    console.log(m)
    dispatch({type:"UPDATE",payload:{follower:m.data.data.follower,following:m.data.data.following}})
   localStorage.setItem("user",JSON.stringify(m.data.data))
   setname({...user,follower:m.data.datta.follower,following:m.data.datta.following})
   yesshow(false)
   
  }
  const unfollowUser=async ()=>{
    const m= await axios.patch("/post/unfollow",{userId})
    console.log(m)
    dispatch({type:"UPDATE",payload:{follower:m.data.data.follower,following:m.data.data.following}})
    localStorage.setItem("user",JSON.stringify(m.data.data))
    setname({...user,follower:m.data.datta.follower,following:m.data.datta.following})
    yesshow(true)
   
  }


  
  
  return (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>

    
    <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid grey"}} >
      <div >
        <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src={user.pic}>
          

          </img>


      </div>
      <div>
        <h4>{user.name}</h4>
        <div style={{display:"flex",justifyContent:'space-between',width:"108%"}}>
        <h5>{data.length} posts</h5>
  {user && user.follower && (
    <h5>{user.follower.length} follower</h5>
  )}
  {user && user.following && (
    <h5>{user.following.length} following</h5>
  )}
  

        </div>
        {show?
         <button className="btn waves-effect waves-light #4a148c purple darken-4"  onClick={followUser} >Follow
  
         </button>:
         <button className="btn waves-effect waves-light #4a148c purple darken-4"  onClick={unfollowUser} >UNFollow
         
         </button>
        }
       
      </div>
      
      
    </div>
    <div className="gallery" >
      {
        data.map(item=>(
          <img  key={item.id} className="item" src={item.photo}></img>
   
    

        )

        )
        
      }
     
     </div>
    
    </div>
  )
}