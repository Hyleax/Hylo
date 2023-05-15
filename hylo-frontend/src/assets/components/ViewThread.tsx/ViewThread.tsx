import React, { useEffect, useState } from 'react'
import './ViewThreads.css'
import Post from '../SinglePost/Post'
import ReplyTextEditor from '../TextEditor/ReplyTextEditor/ReplyTextEditor'
import useGetThread from '../../hooks/useGetThread'
import { postType } from '../SinglePost/Post'


type viewThreadProps = {
  threadID: string | undefined
}

const ViewThread = ({threadID}: viewThreadProps) => {
const [thread, setThread] = useState<postType[]>([])
const [rankPointer, setRankPointer] = useState(0)

const handleRankAnswer = () => {
    if (rankPointer < thread.length - 1) {
      setRankPointer(prev => prev = prev + 1)    
      let num = rankPointer
      return ++num
    }
}




  useEffect(() => {
    (
      async function() {
        const threadData = await useGetThread(threadID)
        setThread(threadData.posts)
        setRankPointer(0)
      }
    )()
  }, [threadID])

  
  
  const posts = thread.map((p: postType ) => {
    return <Post 
      data = {p} 
      key={p._id} 
      numofReplies = {thread.length - 1} 
      setThread={setThread} 
      thread={thread}
      handleRankAnswer={handleRankAnswer}/>
  })

    return (
      <div className='view-thread-container'>
          {posts}
          <ReplyTextEditor threadID={threadID} setThread={setThread}/>
      </div>
    )
  
}

export default ViewThread