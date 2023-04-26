// custom hook to send thread and post data to backend
import axios from "axios";

export default async function useDeletePost(_id: string) {
    try {
        await axios.delete(`http://localhost:5000/hylo/api/v1/thread/delete-reply/${_id}`)
    } catch (error) {
        
    }
}