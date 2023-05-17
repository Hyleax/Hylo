import React, { useEffect, useState, useRef } from 'react'
import './BookmarkContainer.css'
import useGetBookmarkedThreads from '../../../hooks/useGetBookmarkedThreads'
import ThreadPreview from '../../THREAD/ThreadPreview/ThreadPreview'
import { postType } from '../../THREAD/SinglePost/Post'


const BookmarkContainer = () => {
  const [bookmarkedThreads, setBookmarkedThreads] = useState<postType[]>([])
  const bookmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (async() => {
      const data = await  useGetBookmarkedThreads()
      setBookmarkedThreads(data)
    })()
  }, [])

  const handleBookmarkPosts = () => {

    if (bookmarkRef.current) {
      if (bookmarkRef.current.style.visibility == 'hidden') {
        bookmarkRef.current.style.visibility = 'visible'
      }
      console.log('clicked');
      
    }
  }
  

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
      onClick={handleBookmarkPosts}
      ref= {bookmarkRef}
    >
        <h5 className='bookmark-container-title'>Bookmarked Threads</h5>
        {threadPreviewEls}
    </div>
  )
}

export default BookmarkContainer