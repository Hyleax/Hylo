import React, {useEffect, useRef, useState} from 'react'
import './ThreadFilter.css'
import filterLogo from '../../images/filter-svgrepo-com.svg'
import useGetAllPosts from '../../hooks/useGetAllPosts'
import { useSortPosts } from '../../hooks/useSortPosts'

const ThreadFilter = () => {
  const filtersContainerRef = useRef<HTMLUListElement>(null)
  const sortContainerRef = useRef<HTMLDivElement>(null)
  const { setAllPostsAndReplies } = useGetAllPosts()
  const [sort, setSort] = useState("")
    
  useEffect(() => {
    
  })

  const toggleFiltersContainer = () => {
    if (filtersContainerRef.current != null) {
      if (filtersContainerRef.current.style.visibility === 'hidden') {
        filtersContainerRef.current.style.visibility = 'visible'
      }
      else {
        filtersContainerRef.current.style.visibility = 'hidden'
        if (sortContainerRef.current) {
          sortContainerRef.current.style.visibility = 'hidden' 
        }
        
      }
    }
  }

  // functions to open and close the profile dropdown menu
  const handleMouseEnter = () => {
    if (sortContainerRef.current != null) {
      sortContainerRef.current.style.visibility = 'visible' 
    }
}

const handleMouseLeave = () => {
    if (sortContainerRef.current != null) {
      sortContainerRef.current.style.visibility = 'hidden' 
    }
}

const handleSort = async(sortCriteria?: string) => {
  const data  =  await useSortPosts(sortCriteria)
  setAllPostsAndReplies(data)
}

  return (
    <div className='thread-filter-container'>
        <button className='thread-filter-btn' onClick={toggleFiltersContainer}><img className='filter-logo' src={filterLogo} alt="" /> Filters</button>

        <ul 
          className='filters-container' 
          ref={filtersContainerRef}
          >
            <li>Last Hour</li>
            <li>Last Day</li>
            <li>Unanswered</li>
            <li>Staff</li>
            <li>Upvoted</li>
            <li className='sort-container'
            onMouseEnter={handleMouseEnter}
            >
              Sort

              <div 
                className='sort-criteria-container'
                ref={sortContainerRef}
                onMouseLeave={handleMouseLeave}
                >
                  <span onClick={() => handleSort('title')}>Alphabetical</span>
                  <span onClick={() => handleSort('-title')}>Descending</span>
                  <span onClick={() => handleSort('-ratings')}>Upvotes</span>
              </div>
            </li>
        </ul>
    </div>
  )
}

export default ThreadFilter