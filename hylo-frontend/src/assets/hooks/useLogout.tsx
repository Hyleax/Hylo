// custom hook to login, and send login details to backend for verification
import axios from "axios"

export type useLoginProps = {
    username: string
    password: string
    stayLoggedIn: boolean
}

export default async function useLogout() {
   try {
    const { data } = await axios.delete('http://localhost:5000/hylo/api/v1/user/logout')
    console.log(data);
    
    return data

   } catch (error) {
    console.log(error);
    
   }
}
