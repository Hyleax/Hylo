import React, { useRef, useState } from 'react'
import './ChangePasswordForm.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ChangePasswordForm = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const msgRef = useRef<HTMLParagraphElement>(null)
    const navigate = useNavigate()

    const handleChangePasswordSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // get email from localstorage
        const email = localStorage.getItem('email')

        try {
            const { data } = await axios.patch(`http://localhost:5000/hylo/api/v1/auth/change-password/`, {
                password: password,
                confirmPassword: confirmPassword, 
                email: email
            })
            
            if (data) {
                localStorage.removeItem('email')
                
                if (msgRef.current) {
                    msgRef.current.style.visibility = 'visible'
    
                    setTimeout(() => {
                        navigate('/')
                    }, 4000)
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }



    return (
    <form 
        className='forget-password-container'
        onSubmit={(e) => (handleChangePasswordSubmit(e))}
        >
        <h2>Change Password</h2>
        <input 
            required
            className='input-password' 
            type="password"    
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}/>
            
        <input 
        required
        className='input-password' 
        type="password"    
        placeholder='Re-enter your password'
        onChange={(e) => setConfirmPassword(e.target.value)}/>
        <p className='change-pwd-success-msg' ref={msgRef}>Password reseted!, <b> redirecting to login page</b> </p>
        <button className='change-password-btn'>Reset Password</button>
    </form>
  )
}

export default ChangePasswordForm