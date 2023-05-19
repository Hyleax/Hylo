import React, { useEffect, useState } from 'react'
import './AllThreads.css'
import Search from '../Search/Search'
import ThreadFilter from '../ThreadFilter/ThreadFilter'
import ThreadPreview from '../ThreadPreview/ThreadPreview'
import useGetAllPosts from '../../../hooks/useGetAllPosts'

const AllThreads = () => {
  const { allPostsAndReplies } = useGetAllPosts()
  
  const allPosts = allPostsAndReplies?.filter((p) => {
    return p.postType === 'POST'
  })

  const threadPreviewEls = allPosts?.map((p) => {
    return (
      <ThreadPreview 
        data = {p} 
        path = {`../view/`}
        key={p.threadID}
      />)
  })  

  return (
    <div className='all-threads-container'>
      <Search/>
      <ThreadFilter/>

      {allPosts.length !== 0 ? threadPreviewEls :   <div className='pre-loading-threads'>
        <p>Loading Posts</p>
        <div className='loader'></div>
      </div>}
    </div>
  )
}
export default AllThreads