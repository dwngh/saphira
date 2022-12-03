import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

interface FormDialogProps {
    columns;
    item;
    open;
    onClose;
    isEdit;
    onSubmit: (item) => void;
}

export default function FormDialog(props: FormDialogProps) {
    const [formList, setFormList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        console.log("Init")
        console.log(props.item);
        let temp: JSX.Element[] = [];
        props.columns.map((column) => {
            if (column.input) {
                let prop = {...column.props};
                if (props.isEdit) prop.defaultValue = props.item[column.id];
                console.log(props.isEdit);
                console.log(column.props);
                console.log(prop);
                temp.push(<column.input {...prop}/>);
            }
            
        });
        console.log(temp);
        setFormList(temp);
    }, [props.isEdit, props.item, props.open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let newItem = { ...props.item };
        props.columns.map((column) => {
            let newData = data.get(column.id);
            if (newData) newItem[column.id] = newData + "";
        });
        props.onSubmit(newItem);
        props.onClose();
    };

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle>Tạo bệnh viện</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <>
                            { formList.map((item) => item) }
                        </>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {props.isEdit ? "Cập nhật" : "Tạo mới"}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
