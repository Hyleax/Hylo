import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

export type userType = {
  fullName: string,
  email: string,
  description: string,
  bookMarkedPosts: [],
  dateCreatedOn: Date,
  userType: string
  profilePic: string
  totalRatings: number
  numOfPosts: number
  numofIA: number
}

export type userContextType = {
  userData: userType | null
  setUserData: React.Dispatch<React.SetStateAction<userType | null>>
}

// create user context
export const UserContext = createContext<userContextType | null>(null)


// props
type UserContextProviderType = {
  children: React.ReactNode
}


const UserContextProvider = ({children}: UserContextProviderType) => {
  const [userData, setUserData] = useState<userType | null>({} as userType)
  const navigate = useNavigate()

  useEffect(() => {
    (async() => {
      try {
        const { data } = await axios.get('https://hylo-discussion-backend.onrender.com/hylo/api/v1/user')   
        setUserData(data)  
      } catch (error: any) {
        if (error.response.data.error === 'cookie not found') {
          navigate('/')
        }
        
      }
    })()
  }, [])
  

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider