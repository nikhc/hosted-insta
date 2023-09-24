import React,{useState,useContext} from 'react'
import { Link, useParams } from 'react-router-dom'

import {useNavigate} from "react-router-dom"
import { userContext } from '../App'




import axios from 'axios'
import M from 'materialize-css'



export default function Correct() {
  const{state,dispatch}=useContext(userContext);
  const {token}=useParams({});
  const navigate=useNavigate()

  const[nik,nikhil]=useState({Password:""})
  const goto= async ()=>{
    try{
   
    const m=await axios.post(`/resetPassword/${token}`,nik);
    console.log(m.data.data)
    
    if(m.data.data){



    M.toast({html:"password reset ",classes:"#4a148c purple darken-4"});
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
      
      <input type="password" placeholder='password' value={nik.Password}  onChange={(e)=>nikhil({...nik,Password:e.target.value})}/>
      <button className="btn waves-effect waves-light #4a148c purple darken-4"  onClick={goto} >ResetPassword
  
  </button>
  <h1>
    <Link to="/signup">I dont have account</Link>
    <Link to="/reset">RsetPassword</Link>

  </h1>
        
      </div>

   </div>
  )
}