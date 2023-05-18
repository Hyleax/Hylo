import axios from "axios";

// custom hook to sort and filter posts from backend
export async function useSortPosts(sortCriteria?: string) {
    try {
        const { data } = await axios.get(`https://hylo-discussion-backend.onrender.com/hylo/api/v1/thread/get-all-posts?sort=${sortCriteria}`)   
        return data.posts
        
    } catch (error) {
        
    }
}