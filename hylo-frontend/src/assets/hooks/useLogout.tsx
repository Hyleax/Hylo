// custom hook to login, and send login details to backend for verification
import axios from "axios"

export type useLoginProps = {
    username: string
    password: string
    stayLoggedIn: boolean
}

export default async function useLogout() {
   try {
    const { data } = await axios.delete('https://hylo-discussion-backend.onrender.com/hylo/api/v1/logout')
    return data

   } catch (error) {
    console.log(error);
    
   }
}
