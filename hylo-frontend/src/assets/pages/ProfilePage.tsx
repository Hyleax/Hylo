import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MainProfile from '../components/MainProfile/MainProfile'
import useUserData from '../hooks/useUserData'

// main profile page
const ProfilePage = () => {

  // get data of the logged in user
  const  {userData } = useUserData()

  return (
    <div className='profile-page-container'>
        <MainProfile 
          userData = {userData}
        />   
    </div>
  )
}



export default ProfilePage