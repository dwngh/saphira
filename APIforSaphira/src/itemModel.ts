import { connection as sql } from './db';

export function itemModelFunction() {
    const createItem = (item, result) => {
        sql.query("INSERT INTO items SET ?", item, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res);
                result(null, res.id);
            }
        });
    }

    const getItem = (id, result) => {
        console.log("ID" + id)
        sql.query("SELECT * FROM items WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res);
                result(null, res);
            }
        })
    }

    const getItemList = (result) => {
        sql.query("SELECT * FROM items", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                //console.log(res);
                result(null, res);
                console.log("Get all items");
            }
        })
    }

    const updateItem = (item, id, result) => {
        sql.query('UPDATE items SET name = ? , status = ? WHERE id = ?', [item.name, item.status, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        })
    }

    const deleteItem = (id, result) => {
        sql.query('DELETE FROM items WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        })
    }

    return {createItem, getItem, getItemList, updateItem, deleteItem};
}