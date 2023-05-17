import axios from "axios";

export default async function useSaveProfileInfo(firstName?: string ,lastName?: string, description?: string) {
    try {
        const { data } = await axios.patch(`http://localhost:5000/hylo/api/v1/user/edit-profile`, {
            firstName: firstName,
            lastName: lastName,
            description: description
        })

        return data

    } catch (error) {
        console.log(error);
        
    }
}