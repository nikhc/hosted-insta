import axios from 'axios';

import M from 'materialize-css'
import React,{useState} from 'react'
 import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const navigate=useNavigate()
  
  const [nik,nikhil]=useState({title:"",body:"",photo:""})
  const [image,setImage]=useState();
  const postDetails= async ()=>{
    const data=new FormData();
    console.log(image)
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","djobbmy33")
  try{
   
   
    const m= await axios.post('https://api.cloudinary.com/v1_1/djobbmy33/image/upload', data);
    let url=m.data.secure_url
    nikhil((prevNik) => ({
      ...prevNik,
      photo: url,
    }));
    if(nik.photo!=""){
    const n= await axios.post('/post/createpost', nik);
    console.log(n)
    M.toast({html:n.data.data,classes:"#4a148c purple darken-4"});
    }
  


  }
  catch(err){
    M.toast({html:err.message,classes:"#4a148c purple darken-4"});
  }

    
 
   // Assuming you used the POST method for the image upload
   // Replace this with the actual image data you are uploading
}

  return (
    <div className="card "
    style={{margin:"10px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}

    
    >
        <input type="text" placeholder="title" value={nik.title} onChange={(e)=>nikhil({...nik,title:e.target.value})}></input>
         <input type="text" placeholder="body" value={nik.body} onChange={(e)=>nikhil({...nik,body:e.target.value})}></input>
        <div className="file-field input-field">
      <div class="btn">
        <span>upload image</span>
        <input type="file" multiple     onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div classname="file-path-wrapper">
        <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
      </div>
    </div>
   
    <button className="btn waves-effect waves-light #4a148c purple darken-4" onClick={postDetails} >submit
  
  </button>
        
      
    </div>
  )
}
