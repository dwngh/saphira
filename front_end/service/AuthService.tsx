import axios from "axios";
import * as dotenv from 'dotenv'

export const AuthService = () => {
    const fetchLogin = async (userInfo:any) => {
        let data = ''
        await axios({
            method: "POST",
            url: `${process.env.BACKEND_SERVER}/auth/login/`,
            // header  (chỉnh  sửa header khi thêm jwt)
            data: {
                ...userInfo
            }
        })
            .then((res) => {
                data = res.data
                console.log(data)
            })
            .catch((err) => {
                console.error(err);
            });
            return data
    };

    const fetchSignUp = async (userInfo:any) => {
        await axios({
            method: "POST",
            url: `${process.env.BACKEND_SERVER}/users/`,
            // header  (chỉnh  sửa header khi thêm jwt)
            data: {
                ...userInfo
            }
        })
            .then((res) => {
                const data = res.data
                console.log(data)
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return { fetchLogin, fetchSignUp };
};
