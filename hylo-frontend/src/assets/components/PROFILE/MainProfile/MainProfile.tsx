import { useState, useEffect } from 'react'
import './MainProfile.css'
import useGetNameInitials from '../../../hooks/useGetNameInitials'
import AvatarEdit from '../Avatar-edit/AvatarEdit'
import closeLogo from '../../../images/x-circle-svgrepo-com.svg'
import { userType } from '../../../context/userContextProvider'
import useUserData from '../../../hooks/useUserData'
import useSaveProfileInfo from '../../../hooks/useSaveProfileInfo'

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
    
    // state for user information
    const { email, description, fullName, dateCreatedOn, profilePic, totalRatings, numofIA, numOfPosts } = (userData as userType)
    const [nameInitials, setNameInitials] = useState<nameInitalsType>({} as nameInitalsType)
    const [localProfilePic, setLocalProfilePic] = useState("")
    const [localFirstName, setLocalFirstName] = useState('')
    const [localLastName, setLocalLastName] = useState('')
    const [localDescription, setLocalDescription] = useState('')


    // state to set various menu states
    const [imageOverlayOpen, setImageOverlayOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [editBtnClicked, setEditBtnClicked] = useState(false)

    // format date
    const str = String(dateCreatedOn)
    const dateString = str.substring(0, 10)
    
    
    let nameArray;
        
  
    // check if name initials are set
    useEffect(() => {
      (function(){
        if (String(fullName) !== 'undefined') {
    
         setNameInitials(useGetNameInitials(String(fullName)))
         nameArray = fullName.split(" ")
         setLocalFirstName(nameArray[0])
         setLocalLastName(nameArray[1])
        }
        setLocalDescription(description)
          setLocalProfilePic(profilePic)
      })()
    }, [fullName, profilePic, description])


    // submit profile changes to backend
    const saveProfileChanges = async(e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      if (!(!localFirstName || !localLastName)) {
        const data = await useSaveProfileInfo(localFirstName, localLastName, localDescription)

        if (data) {
          setEditBtnClicked(prev => !prev)
        }
      }
    }    

    return (
      <main>
            <div className="profile-container">
                <div 
                  className="image-container"  
                  onMouseEnter={() => setImageOverlayOpen(true)}
                  >
                  {localProfilePic != "" ? 
                  <img className='profile-img' src= {`${localProfilePic}`} alt="" /> :
                  <p>{nameInitials.firstInitial}{nameInitials.secondInitial}</p>}
                  
                </div>
                
                {
                  imageOverlayOpen &&

                  <div 
                  className="edit-image-overlay" 
                  onMouseLeave={() => setImageOverlayOpen(false)}
                  onClick={() => setModalOpen(true)}
                  >
                  <p className="">change profile pic</p>
                </div>
                }

                
                <div className="profile-header">
                  <ul className="profile-header-left">
                    
                    <li className="profile-stat">
                      <span><b>{numOfPosts}</b></span>   
                      <span>Posts</span>                
                    </li>
                  </ul>
  
                  <ul className="profile-header-right">
                  <li className="profile-stat">
                      <span><b>{totalRatings}</b></span>
                      <span>Upvotes</span>                   
                    </li>
  
                    <li className="profile-stat">
                      <span><b>{numofIA}</b></span>
                      <span>Approved</span>                   
                    </li>
                  </ul>
                </div>
  
                <div className="profile-details">
                  <button 
                    onClick={() => setEditBtnClicked(prev => !prev)}
                    className='edit-profile-btn'>{editBtnClicked ? 'cancel' : 'edit profile'}</button>
                  <div className="names-container">

                    <div className="input-field">
                      <span>First Name</span>
                      {editBtnClicked ? <input 
                        type="text" 
                        required
                        value={localFirstName}
                        onChange={e => setLocalFirstName(e.target.value)}
                      />
                    
                      :
                      <p>{localFirstName}</p>
                      }
                    </div>

                    <div className="input-field">
                      <span>Last Name</span>
                      {editBtnClicked ? <input 
                        required
                        type="text" 
                        value={localLastName}
                        onChange={e => setLocalLastName(e.target.value)}/>
                      
                      :
                      
                      <p>{localLastName}</p>}
                    </div>
                  </div>

                  <div className="email-container">
                    <div className="input-field">
                        <span>Email</span>
                        {editBtnClicked ? <input type="text" value={email} disabled/> :  <p>{email}</p>}
                    </div>
                  </div>

                  <div className="description-container">
                    <div className="input-field">
                        <span>Description</span>
                        {editBtnClicked ? <textarea 
                          value={localDescription} 
                          onChange={e => setLocalDescription(e.target.value)}
                          placeholder='enter a description of yourself here'/> :
                          <p>{localDescription ? localDescription : 'Enter a description about yourself'}</p>
                        }
                    </div>
                  </div>

                  {
                    !editBtnClicked &&
                    <div className="date-container">
                    <div className="input-field">
                        <span>Date joined</span>
                        <p>{dateString}</p>
                    </div>
                  </div>
                  }

                  {editBtnClicked && <button onClick={e => saveProfileChanges(e)} className='save-profile-btn'>Save Changes</button>}
                </div>
            </div>

            { 
              modalOpen &&

              <div className="modal">
              <div className="modal-content">
                <img 
                  className='close-logo' 
                  src={closeLogo} 
                  alt=""
                  onClick={() => setModalOpen(false)} />
                <div className="avatar-edit-container">
                  <AvatarEdit 
                    setLocalProfilePic= {setLocalProfilePic}
                    />
                </div>
                
              </div>
            </div>
            }
          </main>
    )
  }

  export default MainProfile