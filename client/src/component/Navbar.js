import React,{useContext,useEffect,useRef,useState} from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'


export default function Navbar() {
  const[search,setSearch]=useState('')
  const searchModel=useRef(null)
  const {state,dispatch}=useContext(userContext)
  useEffect(()=>{
    M.Modal.init(searchModel.current)
  },[])
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
        <li><i className="large material-icons  modal-trigger"   data-target="modal1" style={{color:"black"}}>search</i></li>,
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

  // const fetchusers= async (query)=>{
  //   setSearch(query)
  //  const m= await axios.post("/user/serch-user",{query});
  //  console.log(m.data.data)
  
  // }
  return (
    
         <nav>
    <div className="nav-wrapper white " >
      <Link to={state?"/":"/signin"}className="brand-logo left   ">instagram</Link>
      <ul id="nav-mobile" className="right ">
       {renderList()}
      </ul>
    </div>
    <div id="modal1" className="modal" ref={searchModel} style={{color:"black"}}>
    <div className="modal-content">
    <input type="email" placeholder='search users'  value={search}  onChange={(e)=>{setSearch(e.target.value)}}/>
    
    <ul className="collection">
      <li className="collection-item">Alvin</li>
      <li className="collection-item">Alvin</li>
      <li className="collection-item">Alvin</li>
      <li className="collection-item">Alvin</li>
    </ul>
     
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  </nav>
      
    
  )
}
