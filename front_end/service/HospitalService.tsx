import axios from "axios";

export const HospitalService = () => {

    const updateHospital = async (payload, token) => {
        let response;

        await axios({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_HOST}/hospitals`,
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

    const getHospitals = async (token) => {
        let response;

        await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_HOST}/hospitals`,
            headers: {
                "Authorization": `Bearer ${token}`,
            } 
        })
            .then((res) => {
                console.log("Get all hospitals successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    }

    const createHospital = async (payload, token) => {
        let response;
        console.log("Create hospital ");
        await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_HOST}/hospitals`,
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

    const deleteHospital = async(id, token) => {
        let response;
        await axios({
            method: "DELETE",
            url: `${process.env.NEXT_PUBLIC_HOST}/hospitals/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            } 
        })
            .then((res) => {
                console.log("Get all hospitals successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    }

    return { updateHospital, getHospitals, createHospital, deleteHospital }
}