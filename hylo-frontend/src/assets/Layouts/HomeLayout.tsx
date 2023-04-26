import React, {useEffect} from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import useUserData from '../hooks/useUserData'


// find a way to create protected routes here
  
const HomeLayout = () => {

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default HomeLayout