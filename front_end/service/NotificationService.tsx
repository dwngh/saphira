import axios from "axios";

export default function NotificationService() {
    const getNotifications = async (userId, token) => {
        let response;

        await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_HOST}/notifications/user/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log("Get all notification successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    const markRead = async (id, token) => {
        let response;
        await axios({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_HOST}/notifications/read/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    const markAllRead = async (userId, token) => {
        let response;

        await axios({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_HOST}/notifications/user/${userId}/read`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    return { getNotifications, markRead, markAllRead };
}