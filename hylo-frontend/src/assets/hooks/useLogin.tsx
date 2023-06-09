// custom hook to login, and send login details to backend for verification
import axios from "axios"
import Cookies from "universal-cookie"

export type useLoginProps = {
    username: string
    password: string
    stayLoggedIn: boolean
    token: string | null | undefined
}
  //set cookie 
  const cookies = new Cookies()

export default async function useLogin(
    { username, password, stayLoggedIn, token }: useLoginProps, 
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    setIsLoginClicked: React.Dispatch<React.SetStateAction<boolean>>) {
    try {
        const { data } = await axios.post('https://hylo-discussion-backend.onrender.com/hylo/api/v1/auth/login', {
            username: username,
            password: password,
            stayLoggedIn: stayLoggedIn,
            reCAPTCHAToken: token
        }, {withCredentials: true}
        )


        // cookies are being set on the frontend, now need check server

        // const cookieOptions = stayLoggedIn ? {maxAge: 1000000000, path: '/'} : {path: '/'}
        // cookies.set('token', data.token, cookieOptions)
        return data.token
        
        
    } catch (error: any) {
        
        setErrorMsg(error.response.data.error)
        setTimeout(() => {
            setErrorMsg("")
        }, 3000)
        setIsLoginClicked(false)
    }
}
