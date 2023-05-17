import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import Cookies from 'universal-cookie'
import useUserData from '../../../hooks/useUserData'
import HyloLogo from '../../../images/hylo-logo-png.png'
import useGetNameInitials from '../../../hooks/useGetNameInitials'
import { nameInitalsType } from '../../PROFILE/MainProfile/MainProfile'
import useLogout from '../../../hooks/useLogout'
import BookmarkContainer from '../../BOOKMARK/BookmarkContainer/BookmarkContainer'

const Navbar = () => {
   

    const { userData, setUserData } = useUserData()  
    const [nameInitials, setNameInitials] = useState<nameInitalsType>({} as nameInitalsType)
    const dropdownRef = useRef<HTMLDivElement>(null)

     // check if name initials are set
     useEffect(() => {
        (function(){
          if (userData?.fullName) {
           setNameInitials(useGetNameInitials(userData.fullName))
          }
        })()
      }, [userData?.fullName])



    // functions to open and close the profile dropdown menu
    const handleMouseEnter = () => {
        if (dropdownRef.current != null) {
            dropdownRef.current.style.visibility = 'visible' 
        }
    }

    const handleMouseLeave = () => {
        if (dropdownRef.current != null) {
            dropdownRef.current.style.visibility = 'hidden' 
        }
    }

    const navigate = useNavigate()
    const handleLogout = async() => {
        navigate('/')
        setUserData(null)
        const data = await useLogout()
    }

    return (
    <nav>
        <Link to={'thread/view'}><img className='nav-logo' src={HyloLogo} alt="" /></Link>
        <ul className='nav-links'>
            <li><Link to={'thread/view'} className='link-item'>Home</Link></li>
            <li 
                className='menu-dropdown-parent'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                Menu
        
                        <div className="menu-dropdown" ref={dropdownRef}>
                            <div className="menu-profile-container">
                                
                                {
                                    userData?.profilePic ? 
                                    <img 
                                        className='navbar-profile-pic' src= {userData?.profilePic} alt="X" />
                                    : <div className="nav-name-initials">{nameInitials.firstInitial}{nameInitials.secondInitial}</div>
                                }

                                <div className="name-email-profile-container">
                                    <span><b>{ userData?.fullName }</b></span>
                                    <span>{ userData?.email }</span>
                                </div>
                            </div>

                            <div>
                                <Link 
                                    to={'profile'} 
                                    className='link-item'>User Details
                                </Link>
                            </div>

                            <div>
                                <Link 
                                    to={'instructor-application'} 
                                    className='link-item'>Instructor Application
                                    </Link>
                            </div>
                            
                            <div
                                className=' bookmark-nav-option'>
                               <span className='link-item'> Bookmarked Posts</span>
                                <BookmarkContainer/>
                            </div>
            
                            <div
                                onClick={handleLogout} 
                                className='logout link-item'>Logout
                            </div>
                        </div>
                
            </li>
        </ul>
    </nav>
  )
}

export default Navbar