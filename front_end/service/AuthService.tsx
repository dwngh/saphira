import axios from "axios";
import * as dotenv from "dotenv";

export const AuthService = () => {
    const fetchLogin = async (userInfo: any) => {
        let data;
        await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_HOST}/auth/login/`,
            // header  (chỉnh  sửa header khi thêm jwt)
            data: {
                ...userInfo,
            },
        })
            .then((res) => {
                data = res.data;
            })
            .catch((err) => {
                console.error(err);
            });
        return data;
    };

    const fetchSignUp = async (userInfo: any) => {
        let response;
        await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_HOST}/users/`,
            // header  (chỉnh  sửa header khi thêm jwt)
            data: {
                ...userInfo,
            },
        })
            .then((res) => {
                console.log("Sign in successfully ...");
                response = res;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    const fetchUser = async (token) => {
        let response;
        console.log("TOKENは" + token);
        await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_HOST}/auth/profile`,
            headers: {
                "Authorization": `Bearer ${token}`,
            } 
        })
            .then((res) => {
                console.log("Sign in successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        console.log("Response ...");
        console.log(response);
        return response;
    };

    return { fetchLogin, fetchSignUp, fetchUser };
};
