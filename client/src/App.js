
import { useDispatch, useSelector } from "react-redux";
import Appbar from "./components/Appbar"
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react';
import { redirect } from "react-router-dom";
import {setUser} from './store/auth.js'
import {Outlet} from "react-router-dom";


function App() {
  // const auth =  useSelector(state=>state.auth)
  const dispatch = useDispatch()

  const token = Cookies.get('token')
  const [isLoading, setIsLoading]= useState(false)
  const fetchUser = async () => {
    setIsLoading(true)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
   
    if(res.ok){ 
      const user = await res.json()
      // console.log(user);
      dispatch(setUser(user))
    }
    setIsLoading(false)
    
}
useEffect(()=>{
    fetchUser()
  },[])

  if(isLoading) {
    return <p>Loading ...</p>
  }

  return (
    <>
      <Appbar/>
      <Outlet />
    </>
  );
}

export default App;
