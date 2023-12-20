import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom'

import {useNavigate} from "react-router-dom"
import { userContext } from '../App'




import axios from 'axios'
import M from 'materialize-css'



export default function Signin() {
  const{state,dispatch}=useContext(userContext)
  const navigate=useNavigate()

  const[nik,nikhil]=useState({email:"",Password:""})
  const goto= async ()=>{
    try{
    const m=await axios.post("/user/signin",nik);
    console.log(m.data.data)
    
    if(m.data.data){
     localStorage.setItem("user",JSON.stringify(m.data.data))
      dispatch({type:"USER",payload:m.data.data})


    M.toast({html:"signin success",classes:"#4a148c purple darken-4"});
    navigate("/profile")
    }
    else{
      M.toast({html:m.data.error,classes:"#4a148c purple darken-4"});

    }
     
    }
    catch(err){
      let l=err.message
    M.toast({html:l,classes:"#4a148c purple darken-4"})
    }
  }
  return (
   <div className="mycard">
    <div className="card  auth-card">
      <h2>Chatgram</h2>
      <input type="email" placeholder='email'  value={nik.email}  onChange={(e)=>nikhil({...nik,email:e.target.value})}/>
      <input type="password" placeholder='password' value={nik.Password}  onChange={(e)=>nikhil({...nik,Password:e.target.value})}/>
      <button className="btn waves-effect waves-light #4a148c purple darken-4"  onClick={goto} >login
  
  </button>
  <h3>
    <div><Link to="/signup">I dont have account</Link></div>
    
    <Link to="/reset">RsetPassword</Link>

  </h3>
        
      </div>

   </div>
  )
}
