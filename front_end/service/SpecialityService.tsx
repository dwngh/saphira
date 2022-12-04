import axios from "axios";

export const SpecialityService = () => {

    const updateSpeciality = async (payload, token) => {
        let response;

        await axios({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_HOST}/specialitys`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            data: payload
        })
            .then((res) => {
                console.log("Update user successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    }

    const getSpecialities = async (token) => {
        let response;

        await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_HOST}/specialitys`,
            headers: {
                "Authorization": `Bearer ${token}`,
            } 
        })
            .then((res) => {
                console.log("Get all Speciality successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    }

    const createSpeciality = async (payload, token) => {
        let response;
        console.log("Create hospital ");
        await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_HOST}/specialitys`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            data: payload
        })
            .then((res) => {
                console.log("Create hospitals successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    }

    const deleteSpeciality = async(id, token) => {
        let response;
        await axios({
            method: "DELETE",
            url: `${process.env.NEXT_PUBLIC_HOST}/specialitys/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            } 
        })
            .then((res) => {
                console.log("Delete successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    }

    return { updateSpeciality, getSpecialities, createSpeciality, deleteSpeciality }
}