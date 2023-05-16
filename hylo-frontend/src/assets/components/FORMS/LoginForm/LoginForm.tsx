import React, { useState, useEffect } from 'react'
import Cookies from "universal-cookie";
import './LoginForm.css'
import useLogin from '../../../hooks/useLogin'
import { Link, useNavigate } from 'react-router-dom'
import HyloLogo from '../../images/hylo-logo-png.png'

const LoginForm = () => {
  
  // utilize the useNavigate hook
  const navigate = useNavigate()
  const cookie = new Cookies()

  useEffect(() => {

    // if there is cookie stored, then proceed to home page
    (function() {
      if (cookie.get('token')) {
        console.log(cookie.get('token'));
        
        navigate('/home/thread/view')
      }

    })()
  }, [])

  // login details
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [stayLoggedIn, setStayLoggedIn] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")



  // function to login to Hylo
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await useLogin({ username, password, stayLoggedIn }, setErrorMsg)    
    if (data) {
      
      navigate('/home/thread/view')
    }
  }
  
  return (
        <form className='first-login-container' onSubmit={(e) => handleSubmit(e)}>
          <div className="second-login-container">
              <h2 className='login-title' >Hylo</h2>

              <div className="login-user-input">
              <input 
                required
                type="text" 
                placeholder='Username'
                spellCheck="false"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
              </div>

              <div className="login-user-input">
              <input 
                required
                type="password" 
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              </div>
              

              <p><Link to={'forgot-password'} className='forgot-password-link'>Forgot password ?</Link></p>
              
              <div className='user-stay-logged'>
                <input 
                  onClick={() => setStayLoggedIn(prev => !prev)}
                  type= "checkbox"
                  name='stayLoggedIn'
                  />
                <label htmlFor="stayLoggedIn">Stay Logged in</label>
              </div>

              {/* DISPLAY error message here */}
              <span className='error-msg'>{errorMsg}</span>

              <button className='login-btn'>LOGIN</button>

              

              <span>Don't have an account? 
              <Link to="/register">
              <button className='signup-btn'>SIGN UP</button></Link></span>
          </div>
      </form>
  )
}

export default LoginForm