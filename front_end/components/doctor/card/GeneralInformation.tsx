import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";

const shiftList = [
    "7h00 - 8h00",
    "8h00 - 9h00",
    "9h00 - 10h00",
    "10h00 - 11h00",
    "13h30 - 14h30",
    "14h30 - 15h30",
    "15h30 - 16h30",
    "16h30 - 17h30",
];

interface InformationDialogProps {
    open;
    order;
    onClose;
}

const status = [
    { color: "#ab47bc", message: "Đợi khám" },
    { color: "green", message: "Đã khám" },
    { color: "red", message: "Đã muộn" },
];

export default function InformationDialog(props: InformationDialogProps) {
    const { open, order, onClose } = props;

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thông tin chung"}
                </DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container justifyContent="center">
                            <table style={{ width: 400 }}>
                                <tr>
                                    <td>
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            Người khám:&#9;
                                        </Typography>
                                    </td>
                                    <td>{order?.patient?.name}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            Ca khám:
                                        </Typography>
                                    </td>
                                    <td>{shiftList[order?.shift]}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            Ngày khám:
                                        </Typography>
                                    </td>
                                    <td>
                                        {dayjs(order?.date).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            Mô tả:
                                        </Typography>
                                    </td>
                                    <td>{order?.description}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            Trạng thái:
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography
                                            sx={{
                                                align: "right",
                                                marginRight: 2,
                                            }}
                                            color={status[order?.status ?? 0].color}
                                            variant="subtitle1"
                                        >
                                            {status[order?.status ?? 0].message}
                                        </Typography>
                                    </td>
                                </tr>
                            </table>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
