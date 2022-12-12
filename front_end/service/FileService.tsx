import axios from "axios";

export default function FileService() {
    const uploadFile = async (payload, token) => {
        let response;
        console.log("Upload payload");
        console.log(payload);
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

    return { uploadFile, downloadFile};
}
