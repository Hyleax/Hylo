import axios from "axios";

export default async function useBookmarkThread(postID: string) {
    try {

        const { data } = await axios.patch(`https://hylo-discussion-backend.onrender.com/hylo/api/v1/user/bookmark-thread/${postID}`) 
        return data
        
    } catch (error) {

    }
}