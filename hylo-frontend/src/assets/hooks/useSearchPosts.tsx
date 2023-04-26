import axios from "axios";

export default async function useSearchPosts(title?: string, category?: string) {

    try {
        const { data } = await axios.get(`http://localhost:5000/hylo/api/v1/thread/get-all-posts?title=${title}&category=${category}`)
        return data.posts
    } catch (error) {
        
    }
    
}