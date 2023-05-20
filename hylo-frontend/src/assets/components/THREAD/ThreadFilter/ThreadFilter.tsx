import React, { useState } from 'react'
import './ThreadFilter.css'
import filterLogo from '../../../images/filter-svgrepo-com.svg'
import useGetAllPosts from '../../../hooks/useGetAllPosts'
import { useSortPosts } from '../../../hooks/useSortPosts'

const ThreadFilter = () => {
  const { setAllPostsAndReplies } = useGetAllPosts()
  const [isFilterContainerOpen, setIsFilterContainerOpen] = useState(false)  
  const [isSortContainerOpen, setIsSortContainerOpen] = useState(false)

  
  const handleSort = async(sortCriteria?: string) => {
    const data  =  await useSortPosts(sortCriteria)
    setAllPostsAndReplies(data)
  }

  return (
    <div className='thread-filter-container'>
        <button 
          className='thread-filter-btn' 
          onClick={() => setIsFilterContainerOpen(prev => !prev)}>
            <img 
              className='filter-logo' 
              src={filterLogo} 
              alt="" /> Filters
        </button>

       {
        isFilterContainerOpen &&

         <ul 
          className='filters-container' 
     
         >
           <li>Last Hour</li>
           <li>Last Day</li>
           <li>Unanswered</li>
           <li>Staff</li>
           <li>Upvoted</li>
           <li className='sort-container'
           onMouseEnter={() => setIsSortContainerOpen(true)}
           >
             Sort

             {
              isSortContainerOpen &&

                <div 
                  className='sort-criteria-container'
                  onMouseLeave={() =>  setIsSortContainerOpen(false)}
                >
                  <span onClick={() => handleSort('title')}>Alphabetical</span>
                  <span onClick={() => handleSort('-title')}>Descending</span>
                  <span onClick={() => handleSort('-ratings')}>Upvotes</span>
                </div>
             }
           </li>
       </ul>
       }
    </div>
  )
}

export default ThreadFilter