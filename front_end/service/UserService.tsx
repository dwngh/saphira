import axios from "axios";

export const UserService = () => {

    const getUser = async (userId, token) => {
        let response;

        await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_HOST}/users/${userId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            } 
        })
            .then((res) => {
                console.log("Get an user successfully ...");
                console.log(res)
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        console.log("Returning ...")
        console.log(response);
        return response;
    }

    const updateUser = async (payload, token) => {
        let response;

        await axios({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_HOST}/users`,
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

    const getUsers = async (token) => {
        let response;

        await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_HOST}/users`,
            headers: {
                "Authorization": `Bearer ${token}`,
            } 
        })
            .then((res) => {
                console.log("Get all user successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    }

    return { getUsers, getUser, updateUser }
}