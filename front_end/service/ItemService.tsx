import axios from "axios";

export const ItemService = () => {
    const api_url = "http://localhost:3333";

    const getAllItem = async () => {
        let result : any[] = [];
        await axios
            .get(api_url + "/items/")
            .then((res) => {
                result = res.data;
            })
            .catch((err) => {
                console.error(err);
            });
        return result;
    };

    const getItem = async (id: number) => {
        await axios
            .get(api_url + "/items/" + id)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    };

    const createItem = async (item: any) => {
        await axios
            .post(api_url + "/items/", item)
            .then((res) => {
                if (res.data) console.log("Add item successfully");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const updateItem = async (id: number, item: any) => {
        await axios
            .put(api_url + "/items/" + id, item)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };

    const deleteItem = async (id: number) => {
        await axios
            .delete(api_url + "/items/" + id)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };

    return { getAllItem, getItem, createItem, updateItem, deleteItem };
};
