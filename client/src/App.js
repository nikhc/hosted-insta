import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter,Route,Routes,useNavigate,useLocation } from 'react-router-dom'
import Signup from './component/Signup';
import Signin from './component/Signin';
import Home from './component/Home';
import Profile from './component/Profile';
import UserProfile from './component/UserProfile';
import FollowingPost from './component/FollowingPost';
import Reset from './component/Reset';
import Correct from './component/Correct';


import CreatePost from './component/CreatePost';
import React,{createContext,useEffect,useReducer,useContext} from 'react';
import { initialState,reducer } from './reducers/Userreducer';
import Cookies from 'js-cookie';
export const userContext=createContext()



const Routing=()=>{
  const {state,dispatch}=useContext(userContext)
 
  const navigate=useNavigate()
  const location = useLocation();

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    console.log(user)
   if(Cookies.get("isLoggedIn")){
    dispatch({type:"USER",payload:user})
    
  
   
   }
   else{
    if(!(location.pathname.startsWith('/reset')))
    navigate('/signin')
   }

  },[])
  return(
  <Routes>
  
      
  <Route path="/" element={<Home></Home>}>
      

  </Route>
  <Route path="/signin"  element={<Signin></Signin>}>
     

  </Route>
  <Route path="/signup"  element={<Signup/>}>
    

  </Route>
  <Route exact  path="/profile"  element={<Profile></Profile>}>
 

  </Route>
  <Route path="/createpost"  element={<CreatePost></CreatePost>}>
 

  </Route>
  <Route path="profile/:userId" element={<UserProfile></UserProfile>}>

  </Route>
  <Route path="/FollowingPost" element={<FollowingPost></FollowingPost>}>

  </Route>
  <Route  exact path="/reset" element={<Reset></Reset>}>

  </Route>
  <Route path="/reset/:token" element={<Correct></Correct>}>

</Route>
  

  </Routes>
  )

}

function App() {
  const[state,dispatch]=useReducer(reducer,initialState)
  return (
    <userContext.Provider value={{state,dispatch}}>
       <BrowserRouter>
      <Navbar/>
      <Routing></Routing>
    
   
  

    </BrowserRouter>
    </userContext.Provider>
   

  );
}

export default App;
