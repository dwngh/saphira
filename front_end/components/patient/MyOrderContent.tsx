import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterListIcon from "@mui/icons-material/FilterList";
import OrderCard from "./card/OrderCard";
import { useState, Fragment, useEffect, useRef } from "react";
import SwipeableOrderDetail from "./card/SwipeableOrderDetail";
import { OrderService } from "../../service/OrderService";
import { useAuth } from "../../utils/useAuth";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
interface MyDoctorContentProps {
    orderId?;
    note?;
}

export default function MyDoctorContent(props: MyDoctorContentProps) {
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);
    const [currentOrder, setCurrentOrder] = useState<any>({});
    const noteRef = useRef(null);
    const { getOrdersByPatient } = OrderService();
    const { accessToken, userId } = useAuth();

    const fetchData = async () => {
        const orders = await getOrdersByPatient(userId, accessToken);
        console.log("ORRDARRRR");
        console.log(orders);
        setOrders(orders);
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    useEffect(() => {
        if (props?.orderId) {
            handleOpenDetail(props?.orderId)
        }
    }, [props?.orderId]);

    useEffect(() => {
        console.log("Note: " + props?.note);
        if (props?.note) {
            let temp: any = noteRef.current;
            temp?.scrollIntoView({ behavior: "smooth" });
        }
    }, [props?.note]);

    const handleOpenDetail = (id) => {
        let currentId = +id;
        const item = orders.filter(item => item.id == currentId)[0];
        setCurrentOrder(item);
        setOpen(true);
    };
    return (
        <Paper
            sx={{
                maxWidth: 936,
                margin: "auto",
                overflow: "hidden",
                height: 450,
            }}
        >
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <SearchIcon color="inherit" sx={{ display: "block" }} />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            placeholder="ID Yêu cầu ..."
                            InputProps={{
                                disableUnderline: true,
                                sx: { fontSize: "default" },
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip title="Reload">
                            <IconButton onClick={() => {}}>
                                <FilterListIcon
                                    color="inherit"
                                    sx={{ display: "block" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
            <Paper
                style={{
                    maxHeight: 400,
                    overflow: "auto",
                }}
                variant="outlined"
                square
            >
                {orders.map((order) => (
                    <>
                        {(props.note && props.note == order.id) && (<div ref={noteRef}></div>)}
                        <OrderCard
                            item={{
                                id: order.id,
                                status: order.status,
                                doctor: order.doctor.name,
                                time: "Ca " + shiftList[order?.shift] + " ngày " + dayjs(order?.date).format("DD-MM-YYYY"),
                                address: order.location,
                                note: order.note ?? '',
                            }}
                            onOpenDetail={handleOpenDetail}
                            attachments={order.attachments}
                            infoExpanded={(props.note && props.note == order.id)}
                        />
                    </>
                ))}
            </Paper>
            <SwipeableOrderDetail open={open} setOpen={setOpen} order={currentOrder} />
            <ToastContainer />
        </Paper>
    );
}
