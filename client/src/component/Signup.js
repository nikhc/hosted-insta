import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';

export default function Signup() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [nik, setNik] = useState({
    name: '',
    email: '',
    Password: '',
    pic:undefined
  });
  const maininfo=async ()=>{
    try {
      
      
    

      const response = await axios.post('/user/signup', nik);

      console.log(response+ "jhjhbjhb")

      if (response.data.data) {
        M.toast({
          html: response.data.data,
          classes: '#4a148c purple darken-4',
        });
        navigate('/signin');
      } else {
        M.toast({
          html: response.data.error,
          classes: '#4a148c purple darken-4',
        });
      }
    } catch (err) {
      M.toast({
        html: err.message,
        classes: '#4a148c purple darken-4',
      });
    }

  }

  const postDetails = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'insta-clone');
    data.append('cloud_name', 'djobbmy33');
    
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djobbmy33/image/upload',
        data
      );

      const imageUrl = response.data.secure_url;
      
  setNik({
        ...nik,
        pic: imageUrl
      });
      
      console.log('Updated pic:', nik);
      
      // Continue with other code
    } catch (err) {
      console.log(err.message);
    }
  };

  const goto = async () => {
    
      if (image) {
       await  postDetails();
      }
      else{
      await  maininfo()
      }
      
    

  };

  useEffect( () => {
    console.log(nik.pic)
    console.log(nik.pic)
    console.log(nik.pic)
    console.log(nik.pic)
    console.log(nik.pic)
    console.log(nik.pic)
    console.log(nik.pic)
    console.log(nik.pic)
    if(nik.pic){
      console.log(nik)
      console.log(nik.pic,"jhbjhbhjbv")


    maininfo()
    }
    
  }, [nik.pic]);

  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="name"
          value={nik.name}
          onChange={(e) => setNik({ ...nik, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          value={nik.email}
          onChange={(e) => setNik({ ...nik, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={nik.Password}
          onChange={(e) => setNik({ ...nik, Password: e.target.value })}
        />
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
        <button
          className="btn waves-effect waves-light #4a148c purple darken-4"
          onClick={goto}
        >
          Sign Up
        </button>
        <h5>
          <Link to="/signin">Already have an account? Sign in</Link>
        </h5>
      </div>
    </div>
  );
}

