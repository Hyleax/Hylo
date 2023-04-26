import React, {useContext} from 'react'
import { PostContext, postContextType } from '../context/PostContextProvider'

export default function useGetAllPosts() {
    return useContext(PostContext) as postContextType
}