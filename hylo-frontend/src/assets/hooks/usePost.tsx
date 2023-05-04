// custom hook to send thread and post data to backend
import axios from "axios";

type usePostProps = {
    title: string,
    category: string,
    textEditorValue: string
}

export default async function usePost({title, category, textEditorValue}: usePostProps) {
    try {
        const { data } = await axios.post('localhost:5000/hylo/api/v1/thread/make-post', {
            title: title,
            content: textEditorValue,
            category: category
        })

        return data
        
    } catch (error) {
        console.log(error);
        
    }
}