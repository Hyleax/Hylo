import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
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