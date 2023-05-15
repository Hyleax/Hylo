import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios'
import { postType } from '../components/SinglePost/Post'

export type replyType = {
    content: string;
    createdBy: string;
    creatorName: string;
    instructorApproved: boolean;
    postType: string;
    postedDate: Date;
    ratings: number;
    threadID: string;
    _id: string;
    category: string
    rank: number
}

export type postContextType = {
    allPostsAndReplies: (postType | replyType) []
    setAllPostsAndReplies: React.Dispatch<React.SetStateAction<(postType | replyType)[]>>
}

// create user context
export const PostContext = createContext<postContextType | null>(null)


// props
type PostContextProviderType = {
  children: React.ReactNode
}


const PostContextProvider = ({children}: PostContextProviderType) => {
  const [allPostsAndReplies, setAllPostsAndReplies] = useState<(postType | replyType)[]>([])
  
  useEffect(() => {
    (async() => {
      const { data } = await axios.get('http://localhost:5000/hylo/api/v1/thread/get-all-posts')       
      setAllPostsAndReplies(data.posts)
    })()
  }, [])


  return (
    <PostContext.Provider value={{allPostsAndReplies, setAllPostsAndReplies}}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider