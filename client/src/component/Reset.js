import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom'

import {useNavigate} from "react-router-dom"
import { userContext } from '../App'




import axios from 'axios'
import M from 'materialize-css'



export default function Reset() {
  const{state,dispatch}=useContext(userContext)
  const navigate=useNavigate()

  const[nik,nikhil]=useState({email:""})
  const goto= async ()=>{
    try{
    const m=await axios.post("/user/forgetPassword",nik);
    console.log(m.data.data)
    
    if(m.data.data){
     


    M.toast({html:"Link is send to your mail",classes:"#4a148c purple darken-4"});
    navigate("/signin")
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
      <h2>instagram</h2>
      
      <input type="email" placeholder='email' value={nik.email}  onChange={(e)=>nikhil({...nik,email:e.target.value})}/>
      <button className="btn waves-effect waves-light #4a148c purple darken-4"  onClick={goto} >reset
  
  </button>
  
        
      </div>

   </div>
  )
}
