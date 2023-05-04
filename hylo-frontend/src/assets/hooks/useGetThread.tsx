import axios from "axios";


export default async function useGetThread(threadID: string | undefined) {
    const { data } = await axios.get(`localhost:5000/hylo/api/v1/thread/get-thread/${threadID}`)
    return data   
}