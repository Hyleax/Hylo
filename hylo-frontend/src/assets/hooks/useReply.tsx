// custom hook to reply to a post
// custom hook to send thread and post data to backend
import axios from "axios";


export default async function useReply(threadID: string | undefined, replyTextEditorValue: string) {
    try {
        const { data } = await axios.post(`https://hylo-discussion-backend.onrender.com/hylo/api/v1/thread/reply-post/${threadID}`, {
            content: replyTextEditorValue
        })
        

        return data.post
        
    } catch (error) {
        console.log(error);
        
    }
}