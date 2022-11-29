import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import OrderDetailCard from "./card/OrderDetailCard";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";



export default function OrderDetailContent() {
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleClose = () => {
        setOpenConfirm(false);
    }
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    }
    const handleSave = () => {
        // Xu ly logic
        setOpenConfirm(false);
    }

    return (
        <Paper
            sx={{
                maxWidth: 936,
                margin: "auto",
                overflow: "auto",
                height: 450,
            }}
        >
            <Box sx={{ margin: 3 }}>
                <Typography
                    variant="h5"
                    component="div"
                    color="primary"
                    sx={{ fontWeight: "bold", marginLeft: 2, marginBottom: 3 }}
                >
                    THÔNG TIN THANH TOÁN
                </Typography>
                <OrderDetailCard
                    patient={{
                        name: "Minh",
                        email: "minh2ten@zz.com",
                        birthday: "30-2-2002",
                        phone: "0123456678"
                    }}
                    doctor={{
                        name: "Huy",
                        speciality: "Nghệ thuật hắc ám",
                        shift: 1,
                        date: "30-2-2050",
                        location: "Sao hỏa",
                    }}
                    price={100000}
                    shift={5}
                    date="30-2-2022"
                    isCreated={false}
                />
                <Box
                    m={2}
                    //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28, marginRight: 2 }}
                    >
                        Quay lại
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ height: 40, borderRadius: 28 }}
                        onClick={handleOpenConfirm}
                    >
                        Xác nhận
                    </Button>
                </Box>
            </Box>
            <Dialog
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận yêu cầu"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn muốn tạo yêu cầu với thông tin như trên?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSave} autoFocus>
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
