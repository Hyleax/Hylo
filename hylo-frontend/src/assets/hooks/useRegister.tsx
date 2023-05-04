// custom hook to register a new user to the system
import axios from "axios"

// remember that async functions ALWAYS return promise

export type accountRegistrationDetailsType = {
    email: string
    firstName: string
    lastName: string
    username: string
    password: string
    confirmPassword: string
}

export default async function useRegister(
    {email, firstName, lastName, username, password, confirmPassword}: accountRegistrationDetailsType,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>
    ) {
    try {
        await axios.post('localhost:5000/hylo/api/v1/auth/register', 
            {
                email: email,
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                confirmPassword: confirmPassword
            }) 

            setErrorMsg("You have succesfully Registered\nCheck your email")
            return true

        
    } catch (error: any) {
        setErrorMsg(error.response.data.error)

        return false
    }
}