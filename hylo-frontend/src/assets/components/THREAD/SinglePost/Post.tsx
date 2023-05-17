import React, { useEffect, useState, useRef } from 'react'
import './Post.css'
import axios from 'axios'
import threeDotsLogo from '../../../images/3-vertical-dots-icon.svg'
import useUserData from '../../../hooks/useUserData'
import useDeletePost from '../../../hooks/useDeleteReply'
import tickLogo from '../../../images/approved-signal-svgrepo-com.svg'
import approvedLogo from '../../../images/approved-svgrepo-com.svg'
import useApproveReply from '../../../hooks/useApproveReply'
import useGetNameInitials from '../../../hooks/useGetNameInitials'
import bookmarkEmptyLogo from '../../../images/bookmark-outline-svgrepo-com.svg'
import bookmarkFilledLogo from '../../../images/bookmark-svgrepo-com.svg'
import useBookmarkThread from '../../../hooks/useBookmarkThread'


export type postType = {
    category: string
    content: string
    createdBy: string
    creatorName: string
    instructorApproved: boolean
    postType: string
    postedDate: Date
    ratings: number
    threadID: string
    title: string
    _id: string
    profilePic: string
    userType: String
    rank: number
}

type postProps = {
  data: postType
  numofReplies: number
  setThread: React.Dispatch<React.SetStateAction<postType[]>>
  thread: postType[]
  handleRankAnswer: () => number | undefined
}

const Post = ({ data, numofReplies, setThread, thread, handleRankAnswer }: postProps) => {
    const { userData } = useUserData()
    
    const {content, createdBy, creatorName, instructorApproved, profilePic, postedDate, ratings, title, _id, rank} = data
    const [localProfilePic, setLocalProfilePic] = useState(profilePic)
    const [localRatings, setLocalRatings] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const [localInstructorApproved, setLocalInstructorApproved] = useState(instructorApproved)
    const [localUserType, setLocalUserType] = useState("")
    const postMenuRef = useRef<HTMLDivElement>(null)
    const [localRank, setLocalRank] = useState<number | undefined>(rank)
    const [isRankingClicked, setIsRankingClicked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    // get the name initials
    const {firstInitial, secondInitial} = useGetNameInitials(creatorName)
   
    // allow ratings to change when switching posts
    useEffect(() => {
        setLocalRatings(ratings)
    }, [ratings])

    // get userType of post author
    useEffect(() => {
        (
            async function() {
                const { data } = await axios.get(`http://localhost:5000/hylo/api/v1/thread/get-post-user-type/${createdBy}`)
                setLocalUserType(data.userType)
                
            }
        )()
    }, [])
    

    const handleRatingClick = async() => {
        await axios.patch(`http://localhost:5000/hylo/api/v1/thread/upvote-post/${_id}`)
        setLocalRatings(prev => prev + 1)
    }

    const handleTogglePostMenu = () => {
        setIsMenuOpen(prev => !prev)

        if (isMenuOpen === true) {
            if (postMenuRef.current)
            postMenuRef.current.style.visibility = 'visible' 
        }

        else {
            if (postMenuRef.current)
            postMenuRef.current.style.visibility = 'hidden' 
        }
    }

    const handleDeleteReply = async() => {
        await useDeletePost(_id)
        setThread(prev => prev.filter((p) => {
            return p._id != _id
        }))
    }

    const approveReply = async() => {
        const data = await useApproveReply(_id)
        if (data.status === 'success') {
            setLocalInstructorApproved(prev => !prev)
        }
    }

    const handleRanking = async() => {
        if (isRankingClicked !== true) {
            let num  = handleRankAnswer()
            if (num && num <= numofReplies) {
               try {
                setLocalRank(num)
                const {data} = await axios.patch(`http://localhost:5000/hylo/api/v1/thread/rankReply/${_id}`, {
                    rank: num
                })
               } catch (error) {                
               }
            }
        }
        setIsRankingClicked(true)
    }

    const handleBookmark = async() => {
        const isSaved = await useBookmarkThread(_id)
        if (isSaved) {
            // for now, users can't unsave by clicking again
            if (isBookmarked !== true) {
                setIsBookmarked(prev => !prev)
            }
        }
    }

    return (
        <div>
            <p className='post-title'>{title  ? title : ""} </p>
            <div className="post-container">

                <div className="post-pic-and-upvote">
                    {
                        profilePic  
                           ? <img className='profile-pic' src= {localProfilePic} alt="profile picture" />
                           : <div className="default-pic"><span>{firstInitial}{secondInitial}</span></div>
                    }
                    <div className="upvote-container">
                        <span>{localRatings}</span>
                        <button 
                            onClick={handleRatingClick}
                            className='upvote-btn'>❤</button>
                    </div>
                </div>

                <div className="post-main">
                    <div className="post-header">
                        <div className="post-name-days-ago">
                            <p className='poster-name'>
                                <span className='post-creator-name'>{creatorName}</span> 
                                {localUserType === 'INSTRUCTOR' && <img className='tick-logo' src={tickLogo} alt="" />} 
                            </p>
                            <p className='days-ago'>days ago</p>
                        </div>
                        
                        <div className="post-right-side-container">
            
                        {localInstructorApproved && <img className='approved-logo' src= {approvedLogo} alt="" />}
                        <p> 
                            <span className='posted-on'>posted on</span> <br />
                            <span className='date'>{String(postedDate)}</span>
                        </p>
                         {localRank !== 0 && <div className='answer-ranking'> rank:<span> {localRank}</span> </div>}
                         
                        {
                            title && 
                            <img className='bookmark-logo' 
                                src={isBookmarked ? bookmarkFilledLogo : bookmarkEmptyLogo} 
                                placeholder='bookmark'
                                onClick={handleBookmark}
                                />}

                        {((!title && creatorName === userData?.fullName) || (userData?.userType === 'INSTRUCTOR' && !title)) &&
                        <div className='three-dots-container'>
                            <img
                                onClick={handleTogglePostMenu} 
                                className='three-dots-logo' 
                                src={threeDotsLogo} 
                                alt="3 dots logo" /> 
                            <div className="three-dots-menu" ref = {postMenuRef}>
                                <button 
                                    onClick={handleDeleteReply}
                                    className='three-dots-btn'>
                                        delete
                                </button>
                                {userData.userType === 'INSTRUCTOR' && 
                                <button
                                    onClick={approveReply}
                                    className='three-dots-btn'>
                                        approve
                                </button>}
                                
                                {/* if logged in user is the same as post author */}
                                {
                                    (userData.fullName === thread[0].creatorName) &&
                                    <button
                                        onClick={handleRanking}
                                        className='three-dots-btn'>
                                        rank
                                    </button>
                                }
                            </div>
                        </div>}
                        

                        </div>
                    </div>

                    <div 
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: content}}
                    >
                       
                    </div>
                </div>
            </div>

            {(title && numofReplies > 0) && <p className='num-of-answers'>{numofReplies} {numofReplies === 1 ?  " Answer" : ' Answers'}</p>}
        </div>
    )
}

export default Post