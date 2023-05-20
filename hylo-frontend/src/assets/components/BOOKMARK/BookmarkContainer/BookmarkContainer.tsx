import React, { useEffect, useState } from 'react'
import './BookmarkContainer.css'
import useGetBookmarkedThreads from '../../../hooks/useGetBookmarkedThreads'
import ThreadPreview from '../../THREAD/ThreadPreview/ThreadPreview'
import { postType } from '../../THREAD/SinglePost/Post'


const BookmarkContainer = () => {
  const [bookmarkedThreads, setBookmarkedThreads] = useState<postType[]>([])

  useEffect(() => {
    (async() => {
      const data = await useGetBookmarkedThreads()
      setBookmarkedThreads(data)
    })()
  }, [])
  

  const threadPreviewEls = bookmarkedThreads?.map((p) => {
    return (
      <ThreadPreview 
        data = {p} 
        path = {`../home/thread/view/`}
        key={p.threadID}
      />)
  })

  return (
    <div 
      className='bookmark-container'
    >
        <h5 className='bookmark-container-title'>Bookmarked Threads</h5>
        {threadPreviewEls}
    </div>
  )
}

export default BookmarkContainer