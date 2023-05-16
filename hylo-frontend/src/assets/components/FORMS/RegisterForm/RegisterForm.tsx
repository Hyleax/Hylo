import React, {useState} from 'react'
import './RegisterForm.css'
import useRegister from '../../../hooks/useRegister'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

/**
 * email 
 * first name, last name
 * username
 * password
 * confirm password
 * 
 */


const RegisterForm = () => {

  // states for registration fields
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // state for error message
  const [errorMsg, setErrorMsg] = useState("")

  const navigate = useNavigate()

  // function to register a new user to the system
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // use the useRegister custom hook to register a new user
    // also set the error message depending on the error 
    const isRegistered = await useRegister({email, firstName, lastName, username, password, confirmPassword}, setErrorMsg)
    setEmail("")
    setUsername("")
    setPassword("")
    setConfirmPassword("")

    if (isRegistered) {
      navigate('/')
    }
  }  

  return (
    <div className="register-page-container">
      <div className="register-left-section">
        <h1>H</h1>
        <h1>Y</h1>
        <h1>L</h1>
        <h1>O</h1>
        <h2>Discussion</h2>
      </div>
      <form className='register-first-container' onSubmit={(e) => handleSubmit(e)}>
          <div className="register-second-container">
              <h2>Create an Account</h2>

              {/* email */}
              <div className="register-user-input">
              <input 
                required
                type="email" 
                placeholder='Email'
                spellCheck="false"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
              </div>

              {/* first and last name */}
              <div className="register-first-last-name-container">
                <div className="register-user-input">
                <input 
                  required
                  type="text" 
                  placeholder='First name'
                  spellCheck="false"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}/>
                </div>

                <div className="register-user-input">
                <input 
                  required
                  type="text" 
                  placeholder='Last name'
                  spellCheck="false"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}/>
                </div>
              </div>

              <div className="register-user-input">
              <input 
                required
                type="text" 
                placeholder='Username'
                spellCheck="false"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
              </div>

              <div className="register-user-input">
              <input 
                required
                type="password" 
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              </div>

              <div className="register-user-input">
              <input 
                required
                type="password" 
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
              </div>
            

              {/* DISPLAY error message here */}
              <span className='error-msg '>{errorMsg}</span>

                <button className='register-btn'>REGISTER NOW</button>

              <div className='register-have-account-container'>
                Already have an account? 
                <Link to={'/'} >Login</Link>
              </div>
          </div>
      </form>
    </div>
  )
}

export default RegisterForm