import React, {useEffect, useState} from 'react'
import './Search.css'
import magnifyingGlassIcon from '../../images/magnifying-glass.svg'
import useGetAllPosts from '../../hooks/useGetAllPosts'
import useSearchPosts from '../../hooks/useSearchPosts'


const Search = () => {
  const [searchText, setSearchText] = useState("")
  const { setAllPostsAndReplies } = useGetAllPosts()
  

  const handleSearch = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    (
      async function() {
        const data = await useSearchPosts(searchText, "")
        setAllPostsAndReplies(data)
      }
    )()
  }, [searchText])


  return (
    <div className='search-container'>
        <input className='search-input' type="text" onChange={(e) => handleSearch(e)}/>
        <img className='magnifying-glass-icon' src= {magnifyingGlassIcon} alt="" />
    </div>
  )
}

export default Search