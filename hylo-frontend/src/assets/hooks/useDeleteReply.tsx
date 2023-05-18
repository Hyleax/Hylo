// custom hook to send thread and post data to backend
import axios from "axios";

export default async function useDeletePost(_id: string) {
    try {
        await axios.delete(`https://hylo-discussion-backend.onrender.com/hylo/api/v1/thread/delete-reply/${_id}`)
    } catch (error) {
        
    }
}