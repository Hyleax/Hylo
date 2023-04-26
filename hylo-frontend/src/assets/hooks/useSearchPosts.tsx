import axios from "axios";

export default async function useSearchPosts(title?: string, category?: string) {

    try {
        const { data } = await axios.get(`https://hylo-discussion-backend.onrender.com/hylo/api/v1/thread/get-all-posts?title=${title}&category=${category}`)
        return data.posts
    } catch (error) {
        
    }
    
}