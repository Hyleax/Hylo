import axios from "axios";

export default async function useBookmarkThread(postID: string) {
    try {
        
        const { data } = await axios.patch(`http://localhost:5000/hylo/api/v1/user/bookmark-thread/${postID}`) 
        console.log(data);

        return data
        
    } catch (error) {
        console.log(error);
    }
}