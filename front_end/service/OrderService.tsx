import axios from "axios";

export const OrderService = () => {
    const updateNote = async (payload, token) => {
        let response;
        await axios({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_HOST}/orders/note`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: payload,
        })
            .then((res) => {
                console.log("Update note successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    }

    const updateOrder = async (payload, token) => {
        let response;
        delete payload["calendar"];
        delete payload["doctor"];
        delete payload["patient"];
        delete payload["speciality"];
        console.log(payload);
        await axios({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_HOST}/orders`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: payload,
        })
            .then((res) => {
                console.log("Update order successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    const getOrders = async (token) => {
        let response;

        await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_HOST}/orders`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log("Get all order successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    const createOrder = async (payload, token) => {
        let response;
        console.log("Create order ");
        delete payload["calendar"];
        delete payload["doctor"];
        delete payload["patient"];
        console.log(payload);
        await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_HOST}/orders`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: payload,
        })
            .then((res) => {
                console.log("Create order successfully ...");
                response = res;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    const deleteOrder = async (id, token) => {
        let response;
        await axios({
            method: "DELETE",
            url: `${process.env.NEXT_PUBLIC_HOST}/orders/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
    };

    const getOrdersByPatient = async (patientId, token) => {
        let response;

        await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_HOST}/orders/patient/${patientId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log("Get all order of patient successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    const getOrdersByDoctor = async (doctorId, token) => {
        let response;

        await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_HOST}/orders/doctor/${doctorId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log("Get all order of doctor successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    const getOrdersWithAttachment = async (token) => {
        let response;

        await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_HOST}/orders/attachments`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log("Get all order w attachments successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    return {
        getOrdersByPatient,
        getOrders,
        createOrder,
        deleteOrder,
        updateOrder,
        getOrdersByDoctor,
        getOrdersWithAttachment,
        updateNote,
    };
};
