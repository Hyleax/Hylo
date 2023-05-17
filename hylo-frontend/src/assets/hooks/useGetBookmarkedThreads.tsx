import axios from "axios";

export default async function useGetBookmarkedThreads() {
    try {
        const { data } = await axios.get(`http://localhost:5000/hylo/api/v1/user/get-bookmarked-threads`)
        return data.bookmarkedPosts
    } catch (error) {
        console.log(error);
                
    }
}