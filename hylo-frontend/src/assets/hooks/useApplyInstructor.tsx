import axios from "axios";

export default async function useApplyInstructor(file: File[]) {    
    const formdata = new FormData()
   
    for (let i =0; i < file.length; i++) {
        formdata.append('files', file[i])
    }


    try {
        const { data } = await axios({
            method: 'POST',
            url: `https://hylo-discussion-backend.onrender.com/hylo/api/v1/user/upload-file`,
            data: formdata,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return data

    } catch (error) {
        console.log(error);
        
    }
}