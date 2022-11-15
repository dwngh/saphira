import axios from "axios";

export const AuthService = () => {
    const BACKEND_SERVER = "http://localhost:3333";

    const fetchLogin = async (userInfo:any) => {
        await axios({
            method: "POST",
            url: `${BACKEND_SERVER}/auth/login/`,
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

    const fetchSignUp = async (userInfo:any) => {
        await axios({
            method: "POST",
            url: `${BACKEND_SERVER}/users/`,
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
