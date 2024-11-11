//src/components/Logout.jsx
import React from 'react'
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth.js"
import {logout } from "../store/authSlice.js"

function Logout() {
    const dispatch = useDispatch()

    const logoutHandler = async() => {
      try {
       await authService.logout();
          dispatch(logout());
      
      } catch (error) {
        
      }
       
    };
  return (
    <button
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default Logout