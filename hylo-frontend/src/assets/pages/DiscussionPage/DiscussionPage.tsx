import React from 'react'
import './DiscussionPage.css'
import { useParams } from 'react-router-dom'
import AllThreads from '../../components/AllThreads/AllThreads'
import ViewThread from '../../components/ViewThread.tsx/ViewThread'

// Discussion page

// the discussion page has 2 components
// ViewThread and ViewPost
const DiscussionPage = () => {
  const params = useParams()
  const threadID = params.id
  
  return (
    <div className='discussion-container'>
      <AllThreads/>
      {threadID ?
      <ViewThread threadID = {threadID}/> :

        <div className="thread-not-selected-container">
           <h1>Select a thread</h1>
        </div>

      }
    </div>
  )
}

export default DiscussionPage