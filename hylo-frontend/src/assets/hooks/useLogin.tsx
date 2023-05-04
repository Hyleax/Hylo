// custom hook to login, and send login details to backend for verification
import axios from "axios"
import Cookies from "universal-cookie"

export type useLoginProps = {
    username: string
    password: string
    stayLoggedIn: boolean
}
  //set cookie 
  const cookies = new Cookies()

export default async function useLogin(
    { username, password, stayLoggedIn }: useLoginProps, 
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>) {
    try {
        const { data } = await axios.post('localhost:5000/hylo/api/v1/auth/login', {
            username: username,
            password: password,
            stayLoggedIn: stayLoggedIn
        }, {withCredentials: true}
        )

        console.log(data);
        
       
        // cookies are being set on the frontend, now need check server

        // const cookieOptions = stayLoggedIn ? {maxAge: 1000000000, path: '/'} : {path: '/'}
        // cookies.set('token', data.token, cookieOptions)
        return data.token
        
        
    } catch (error: any) {
        setErrorMsg(error.response.data.error)
        setTimeout(() => {
            setErrorMsg("")
        }, 3000)
    }
}
