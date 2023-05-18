import React, {useEffect} from 'react'
import Navbar from '../components/NAV/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

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