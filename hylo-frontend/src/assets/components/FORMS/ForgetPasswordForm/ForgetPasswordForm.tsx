import React, { useRef, useState } from 'react'
import './ForgetPasswordForm.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgetPasswordForm = () => {
    const [email, setEmail] = useState("")
    const msgRef = useRef<HTMLParagraphElement>(null)
    const navigate = useNavigate()

    const handleForgetPasswordSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const { data } = await axios.post(`http://localhost:5000/hylo/api/v1/auth/forgot-password`, {
            email: email
        })

        if (data) {
            localStorage.setItem('email', email)

            if (msgRef.current) {
                msgRef.current.style.visibility = 'visible'
    
                setTimeout(() => {
                    if (msgRef.current) {
                        msgRef.current.style.visibility = 'hidden'
                        navigate('/')
                    }
                }, 5000)
            }
        }

    }

    return (
    <form 
        className='forget-password-container'
        onSubmit={(e) => (handleForgetPasswordSubmit(e))}
        >
        
        <input 
            required
            className='email-input-forget-password' 
            type="email"    
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}/>
        <p className='example-email'>e.g. hylodiscussion@gmail.com</p>
        <p className='password-reset-success-msg' ref={msgRef}>please check your email for a reset password link,<br /><b> redirecting to login page</b> </p>
        <button className='forget-password-btn'>Reset Password</button>

        <ul className="other-links">
            <li><Link className='other-link-item' to={'/'}>login</Link></li>
            <li><Link className='other-link-item' to={'/register'}>register</Link></li>
        </ul>
    </form>
  )
}

export default ForgetPasswordForm