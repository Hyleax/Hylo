import React, {useRef} from 'react'
import './ThreadPreview.css'
import { postType } from '../SinglePost/Post'
import { useNavigate } from 'react-router-dom'
import { replyType } from '../../../context/PostContextProvider'

type ThreadPreviewProps = {
  data: (postType | replyType)
  path: string
}

const ThreadPreview = ({ data, path }:ThreadPreviewProps) => {
  const categoryRef = useRef<HTMLSpanElement>(null)

  const { creatorName, postedDate, ratings, threadID, title, _id, category } = (data as postType)

    // change category badge color

    let categoryEl;
    if (category === 'GENERAL'){
      if (categoryRef.current){
        categoryRef.current.style.backgroundColor = "orange"
      }

      categoryEl = category.toLowerCase()
    }

    else if (category === 'LECTURES'){
      if (categoryRef.current){      
        categoryRef.current.style.backgroundColor = "lightgreen"
      }

      categoryEl = category.toLowerCase()
    }

    else if (category === 'PRACTICALS'){
      if (categoryRef.current){
        categoryRef.current.style.backgroundColor = "skyblue"
      }

      categoryEl = category.toLowerCase()
    }

    else if (category === 'QUIZZES'){
      if (categoryRef.current){
        categoryRef.current.style.backgroundColor = "yellow"
      }

      categoryEl = category.toLowerCase()
    }

    else if (category === 'ASSIGNMENTS'){
      if (categoryRef.current){
        categoryRef.current.style.backgroundColor = "pink"
      }

      categoryEl = category.toLowerCase()
    }

    else if (category === 'FINAL EXAM'){
      if (categoryRef.current){
        categoryRef.current.style.backgroundColor = "#FF4F4B"
      }

      categoryEl = category.toLowerCase()
    }

    const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${path}${threadID}`)
  }

    return (
      <div className='thread-preview-container' onClick={handleClick}>
        <p className='thread-preview-title'>{title}</p>
        <div className="thread-preview-content">
        <div className="thread-preview-content-left">
        <span className='thread-preview-category' ref={categoryRef}>{categoryEl}</span>
          <span className='thread-creator'>{creatorName}</span>
          <span className='thread-user-type'></span>
          {/* <span className='thread-days-ago'>5d</span> */}
        </div>

        <div className="thread-preview-content-right">
          <span>❤</span>
          <span>{ratings}</span>
        </div>
        </div>
      </div>
    )
}

export default ThreadPreview