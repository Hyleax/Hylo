import React from 'react'
import Sidebar from '../components/NAV/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const ThreadLayout = () => {
  return (
    <>
        <Sidebar/>
        <Outlet/>
    </>
  )
}

export default ThreadLayout