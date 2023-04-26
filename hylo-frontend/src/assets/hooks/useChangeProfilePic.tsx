import axios from "axios";

export default async function useChangeProfilePic(profilePicInBase64: string | null) {
    try {
        const { data } = await axios.patch(`https://hylo-discussion-backend.onrender.com/hylo/api/v1/user/change-pic`, {
            profilePicString: profilePicInBase64
        })        
        return data.pic
        
    } catch (error) {
        
    }
}