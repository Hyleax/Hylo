import React, {useContext} from 'react'
import { UserContext, userContextType } from '../context/userContextProvider'

export default function useUserData() {
    return useContext(UserContext) as userContextType
}