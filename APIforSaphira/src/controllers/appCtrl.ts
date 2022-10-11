'use strict';

//import Item from '../item';
import {itemModelFunction} from '../itemModel'

const {createItem, getItem, getItemList, updateItem, deleteItem} = itemModelFunction();

export const get_item = (req, res) => {
    getItem(req.params.id, (err, result) => {
        if (err) {
            res.send(err);
        } else res.json(result);
    })
}

export const get_item_list = (req, res) => {
    getItemList((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
}

export const create_item = (req, res) => {
    const item = req.body;
    item.created_at = new Date();
    item.status = item.status ?? 1;
    delete item.id;
    if (!item.name){
        res.status(400).send({ error:true, message: 'Name or status cannot be empty' });
    } else {
        createItem(item, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
}

export const delete_item = (req, res) => {
    const id = req.params.id;
    if (id === undefined){
        res.status(400).send({ error:true, message: 'Name or status cannot be empty' });
    } else {
        deleteItem(id, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
}

export const update_item = (req, res) => {
    const item = req.body;
    const id = req.params.id;
    //console.log(item);
    //console.log(id);
    console.log('Item id =', id, 'updated!');
    if (!item.name || item.status === undefined){
        res.status(400).send({ error:true, message: 'Name or status cannot be empty' });
    } else {
        updateItem(item, id, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
}