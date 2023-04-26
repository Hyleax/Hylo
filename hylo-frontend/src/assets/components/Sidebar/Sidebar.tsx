import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import useGetAllPosts from '../../hooks/useGetAllPosts'
import useSearchPosts from '../../hooks/useSearchPosts'

const Sidebar = () => {
  const { setAllPostsAndReplies } = useGetAllPosts()

  const handleFilterByCategory = async(category: string) => {    
    const data = await useSearchPosts("", category)
    setAllPostsAndReplies(data)
  }

  return (
            <div className="category-container">
            <Link to={'create'} className='link-item'><button className='discussion-btn'>Create New Post</button></Link>
                <div className="category-inner-container">
                  <div className="">
                  <button className="category-btn" onClick={() => handleFilterByCategory('GENERAL')}>General</button>
                <button className="category-btn" onClick={() => handleFilterByCategory('LECTURES')}>Lectures</button>
                <button className="category-btn" onClick={() => handleFilterByCategory('PRACTICALS')}>Practicals</button>
                <button className="category-btn" onClick={() => handleFilterByCategory('QUIZZES')}>Quizzes</button>
                <button className="category-btn" onClick={() => handleFilterByCategory('ASSIGNMENTS')}>Assignments</button>
                <button className="category-btn" onClick={() => handleFilterByCategory('FINAL EXAM')}>Final Exam</button>
                  </div>
                </div>
            </div>
  )
}

export default Sidebar