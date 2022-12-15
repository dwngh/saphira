import axios from "axios";

export default function FileService() {
    const uploadFile = async (payload, token) => {
        let response;
        await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_HOST}/attachments/upload`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: payload,
        })
            .then((res) => {
                console.log("Create file successfully ...");
                response = res;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    };

    const downloadFile = (id) => {
        window.open(`${process.env.NEXT_PUBLIC_HOST}/attachments/${id}`);
    }

    const getAttachmentByPatientId = async (id, token) => {
        let response;
        await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_HOST}/attachments/patient/${id}`,
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
    }

    return { uploadFile, downloadFile, getAttachmentByPatientId };
}
