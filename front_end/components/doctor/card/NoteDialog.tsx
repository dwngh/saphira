import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface NoteDialogProp {
    open;
    setOpen;
    onSubmit;
    note;
}

export default function NoteDialog(props: NoteDialogProp) {
    const { open, setOpen, onSubmit, note} = props;

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        onSubmit(value);
    }

    useEffect(() => {
        setValue(props.note)
    }, [props.note])

    const [value, setValue] = useState(note);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Note của bác sĩ"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sau khi chỉnh sửa note sẽ được thông báo với người khám
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Note"
                        type="email"
                        fullWidth
                        variant="standard"
                        multiline
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        minRows={3}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSubmit} autoFocus>
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
