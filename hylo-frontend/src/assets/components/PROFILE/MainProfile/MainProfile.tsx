import { useState, useRef, useEffect } from 'react'
import './MainProfile.css'
import useGetNameInitials from '../../../hooks/useGetNameInitials'
import AvatarEdit from '../Avatar-edit/AvatarEdit'
import closeLogo from '../../../images/x-circle-svgrepo-com.svg'
import { userType } from '../../../context/userContextProvider'
import useUserData from '../../../hooks/useUserData'

type MainProfileProps = {
    userData: userType | null
  }
  
export type nameInitalsType = {
  firstInitial: string
  secondInitial: string
}
  
  //main profile component
  const MainProfile = () => {

     // get data of the logged in user
  const  { userData } = useUserData()

    const { email, description, fullName, dateCreatedOn, profilePic, totalRatings, numofIA, numOfPosts } = (userData as userType)
    const [nameInitials, setNameInitials] = useState<nameInitalsType>({} as nameInitalsType)
    const [modalOpen, setModalOpen] = useState(false)
    const [localProfilePic, setLocalProfilePic] = useState("")
    const imageContainerRef = useRef<HTMLDivElement>(null)
    const imageOverlayRef = useRef<HTMLDivElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const modalContentRef = useRef<HTMLDivElement>(null)
    
    console.log(profilePic);
    

    // check if name initials are set
    useEffect(() => {
      (function(){
        if (String(fullName) !== 'undefined') {
    
         setNameInitials(useGetNameInitials(String(fullName)))
        }
          setLocalProfilePic(profilePic)
      })()
    }, [fullName, profilePic])




    // if mouse hover over and off the profile pic element
    const handleMouseEnterImageOverlay = () => {
      if (imageOverlayRef.current){
        imageOverlayRef.current.style.visibility = 'visible'
      }     
    }

    const handleMouseLeaveImageOverlay = () => {
      if (imageOverlayRef.current){
        imageOverlayRef.current.style.visibility = 'hidden'
      }      
    }



    // function to display and hidel modal based on user click
    const handleModal = () => {
      if (modalOpen === false) {
        if (modalRef.current) {
          modalRef.current.style.display = 'block'
          setModalOpen(prev => !prev)
        }
      }
      else {
        if (modalRef.current) {
          modalRef.current.style.display = 'none'
          setModalOpen(prev => !prev)
        }
      }
    }

    
    

    return (
      <main>
            <div className="profile-container">
                <div 
                  className="image-container" 
                  ref={imageContainerRef} 
                  onMouseEnter={handleMouseEnterImageOverlay}
                  >
                  {localProfilePic != "" ? 
                  <img className='profile-img' src= {`${localProfilePic}`} alt="" /> :
                  <p>{nameInitials.firstInitial}{nameInitials.secondInitial}</p>}
                  
                </div>
                <div 
                  className="edit-image-overlay" 
                  ref={imageOverlayRef}
                  onMouseLeave={handleMouseLeaveImageOverlay}
                  onClick={handleModal}
                  >
                  <p className="">change profile pic</p>
                </div>
                <div className="profile-header">
                  <ul className="profile-header-left">
                    
                    <li className="profile-stat">
                      <span><b>{numOfPosts}</b></span>   
                      <span>Posts</span>                
                    </li>
  
                    <li className="profile-stat">
                      <span><b>{totalRatings}</b></span>
                      <span>Upvotes</span>                   
                    </li>
  
                    <li className="profile-stat">
                      <span><b>{numofIA}</b></span>
                      <span>Approved</span>                   
                    </li>
                  </ul>
  
                  <ul className="profile-header-right">
                    <li>Stats to be implemented</li>
                  </ul>
                </div>
  
                <div className="profile-details">
                  <h2>{fullName}</h2>
                  <h3>{ email }</h3>
                  <h4>Joined on: {String(dateCreatedOn)}</h4>
                  <h5>{description}<i>- {fullName}</i></h5>
                  <h3>Norman Teik-Wei Yap 47787717 INFS3202</h3>
                  </div>
            </div>

            <div className="modal" ref={modalRef} >
              <div className="modal-content" ref={modalContentRef}>
                <img 
                  className='close-logo' 
                  src={closeLogo} 
                  alt=""
                  onClick={handleModal} />
                <div className="avatar-edit-container">
                  <AvatarEdit 
                    setLocalProfilePic= {setLocalProfilePic}
                    />
                </div>
                
              </div>
            </div>
          </main>
    )
  }

  export default MainProfile