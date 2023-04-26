// custom hook to send thread and post data to backend
import axios from "axios";

export default async function useApproveReply(_id: string) {
    try {
        const { data } = await axios.patch(`https://hylo-discussion-backend.onrender.com/hylo/api/v1/thread/approve-post/${_id}`)
        return data
        
    } catch (error) {
        
    }
}