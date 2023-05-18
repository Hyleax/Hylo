import axios from "axios";

export default async function useGetBookmarkedThreads() {
    try {
        const { data } = await axios.get(`https://hylo-discussion-backend.onrender.com/hylo/api/v1/user/get-bookmarked-threads`)
        return data.bookmarkedPosts
    } catch (error) {
            
    }
}