import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { userContext } from '../App'

export default function Profile() {
  const{state,dispatch}=useContext(userContext)
  const[data,setData]=useState([]);
  const [image,setImage]=useState();
 
  const getData=async ()=>{
 const n= await axios.get("/post/mypost");
 console.log(n.data.data)
 console.log(state,"jhbhjbjdhsbu")

setData(n.data.data);

 
 

  }
  useEffect( ()=>{
getData()
  },[])

  const updatedate=async()=>{
    const data=new FormData();
    console.log(image)
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","djobbmy33")
  try{
   
   
    const m= await axios.post('https://api.cloudinary.com/v1_1/djobbmy33/image/upload', data);
    let url=m.data.secure_url
    console.log(url)

    
    
    console.log(state._id)
    console.log(state._id)
    console.log(state._id)
    console.log(state._id)
    console.log(state._id)
    

   const user= await axios.patch(`/post/updatepic/${state._id}`,{url})
   console.log(user)

   localStorage.setItem("user",JSON.stringify({...state,pic:url}));
    dispatch({type:"updatepic",payload:url})
  }
  catch(err){
    console.log(err.mesaage)
  }

  }
  useEffect(()=>{
    updatedate()
   


  },[image])
  
  
  return (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>

    <div style={{margin:"18px 0px",borderBottom:"1px solid grey"}}>
    <div style={{display:"flex",justifyContent:"space-around"}} >
      <div >
        <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src={state?state.pic:"loading"}>
          

          </img>


      </div>
      <div>
     

      
        <h4>{state?state.name:"loading"}</h4>
        <div style={{display:"flex",justifyContent:'space-between',width:"108%"}}>
          <h5>{data.length} posts</h5>
          <h5>{state?state.follower.length:"0"} follower</h5>
          <h5>{state?state.following.length:"0"} following</h5>

        </div>
      </div>
      
      
    </div>
    <div className="file-field input-field">
          <div className="btn">
            <span>Upload Image</span>
            <input
              type="file"
              multiple
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Upload one or more files"
            />
          </div>
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
