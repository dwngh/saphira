import axios from "axios";
import * as dotenv from "dotenv";

export const AuthService = () => {
    const fetchLogin = async (userInfo: any) => {
        let data = "";
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
                console.log(data);
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

    return { fetchLogin, fetchSignUp };
};
