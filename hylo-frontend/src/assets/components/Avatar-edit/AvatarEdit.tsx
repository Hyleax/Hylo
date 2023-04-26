import React, { useState, useRef } from 'react'
import Avatar from 'react-avatar-edit'
import './AvatarEdit.css'
import useChangeProfilePic from '../../hooks/useChangeProfilePic'

type AvatarEditProps = {
    setLocalProfilePic: React.Dispatch<React.SetStateAction<string>>
}

function AvatarEdit({ setLocalProfilePic}: AvatarEditProps) {
    const [src, setSrc] = useState<string | undefined>(undefined)
    const [preview, setPreview] = useState<string | null>(null)
    const successMsgRef = useRef<HTMLParagraphElement>(null)

    const onClose = () => {
        setPreview(null)
    }

    const onCrop = (view: string) => {
        setPreview(view)
    }

    const handleChangeProfilePic = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data =  await useChangeProfilePic(preview)
        if (data) {
            setLocalProfilePic(data)
            if (successMsgRef.current) {
                successMsgRef.current.style.visibility = 'visible'
            }
            setTimeout(() => {
                if (successMsgRef.current) {
                    successMsgRef.current.style.visibility = 'hidden'
                }
            },  3000)
        }
    }

    return (
        <form onSubmit={(e) => handleChangeProfilePic(e)}>
            <Avatar
                width={400}
                height={300}
                src= {src}
                onCrop={onCrop}
                onClose={onClose}
            />
            <p className='pic-change-success-msg' ref={successMsgRef}>Profile Pic Updated</p>
            <button className='update-profile-photo-btn'>Update profile Picture</button>
        </form>
    )
}

export default AvatarEdit