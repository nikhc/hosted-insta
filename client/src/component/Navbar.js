import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
  const {state,dispatch}=useContext(userContext)
  const navigate=useNavigate();
  const  goto= async ()=>{
    try{
    
    localStorage.removeItem("user")
    dispatch({type:"clear"})

    const m= await axios.get("/user/logout");

    

    
    navigate("/signin")





    }
    catch(err){
      console.log(err.message)

    }
  }
  
  const renderList=()=>{
    if(state){
      return[
        <li><Link to="/FollowingPost">FollowingPost</Link></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">CreatePost</Link></li>,
        <button className="btn waves-effect waves-light #4a148c purple darken-4"  onClick={goto} >logout
  
        </button>
      
       
      ]
      
     
    }
    else{
      return [
       
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
    
  }
  return (
    
         <nav>
    <div class="nav-wrapper white " >
      <Link to={state?"/":"/signin"}className="brand-logo left   ">instagram</Link>
      <ul id="nav-mobile" class="right ">
       {renderList()}
      </ul>
    </div>
  </nav>
      
    
  )
}
