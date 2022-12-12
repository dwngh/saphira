import * as React from "react";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import OrderDetailCard from "./card/OrderDetailCard";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { UserService } from "../../service/UserService";
import { useAuth } from "../../utils/useAuth";
import dayjs from "dayjs";

interface OrderDetailContentProps {
    order;
    onPreviousTab;
    onSubmit;
}

export default function OrderDetailContent(props: OrderDetailContentProps) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [patient, setPatient] = useState<any>();
    const { accessToken } = useAuth();
    const { getUser } = UserService();

    const fetchPatient = async(patientId) => {
        if (patientId) {
            const user = await getUser(patientId, accessToken);
            if (user) setPatient(user);
        }
    }

    useEffect(() => {
        fetchPatient(props?.order?.patientId);
        console.log('ORRDEERSAAAA')
        console.log(dayjs(props.order.date).format("DD/MM/YYYY"));
    }, [])
    const handleClose = () => {
        setOpenConfirm(false);
    }
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    }
    const handleSave = () => {
        // Xu ly logic
        props.onSubmit();
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
                        name: patient?.name,
                        email: patient?.email,
                        birthday: patient?.birthday ? dayjs(patient?.birthday).format('DD - MM - YYYY') : '',
                        phone: patient?.phone,
                    }}
                    doctor={{
                        name: props.order?.doctor?.name,
                        speciality: props.order?.doctor?.speciality?.name,
                        shift: props.order?.shift,
                        date: props.order.date,
                        location: props.order?.doctor?.hospital?.name,
                        price: props.order?.price,
                    }}
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
                        onClick={props.onPreviousTab}
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
