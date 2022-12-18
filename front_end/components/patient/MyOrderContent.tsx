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
import { Menu, MenuItem } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { Icon } from "@mui/material";

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
    const [showPendingItemFilter, setShowPendingItemFilter] = useState(true);
    const [showDoneItemFilter, setShowDoneItemFilter] = useState(false);
    const [showLateItemFilter, setShowLateItemFilter] = useState(false);
    const [orderList, setOrderList] = useState<any>([]);
    const [filterId, setFilterId] = useState('');

    const fetchData = async () => {
        const orders = await getOrdersByPatient(userId, accessToken);
        setOrderList(orders);
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
        if (props?.note) {
            let temp: any = noteRef.current;
            temp?.scrollIntoView({ behavior: "smooth" });
        }
    }, [props?.note]);

    const handleOpenDetail = (id) => {
        let currentId = +id;
        const item = orderList.filter(item => item.id == currentId)[0];
        setCurrentOrder(item);
        setOpen(true);
    };

    const [filterMenu, setFilterMenu] = useState(null);
    const openFilter = Boolean(filterMenu);

    const handleClose = () => {
        setFilterMenu(null);
    };
    const handleFilterMenuOpen = (e) => {
        setFilterMenu(e.currentTarget);
    };

    const filterItem = (list) => {
        let temp = list;
        if (!showPendingItemFilter) {
            temp = temp.filter(item => item.status != 0);
        }
        if (!showDoneItemFilter) {
            temp = temp.filter(item => item.status != 1);
        }
        if (!showLateItemFilter) {
            temp = temp.filter(item => item.status != 2);
        }
        temp = temp.sort((a, b) => {
            let a_value = dayjs(a?.date);
            let b_value = dayjs(b?.date);
            if (a.status != b.status && b.status == 0) return 1;
            if (a.status != b.status && a.status == 0) return -1;
            if (a_value.isSame(b_value, "day")) {
                if (a?.shift == b?.shift) {
                    let a_value_c = dayjs(a?.created_at);
                    let b_value_c = dayjs(b?.created_at);
                    if (a_value_c.isBefore(b_value_c, "day")) return -1;
                    else return 1;
                }
                if (a?.shift < b?.shift) return 1;
                else return -1;
            }
            if (a_value.isBefore(b_value, "day")) return 1;
            else return -1;
        })
        return temp;
    }

    useEffect(() => {
        if (filterId != '') {
            setOrders(filterItem(orderList.filter(item => {
                let st = item.id + ' ';
                return st.indexOf(filterId) != -1;
            })))
        } else setOrders(filterItem(orderList));
    }, [filterId, orderList, showPendingItemFilter, showDoneItemFilter, showLateItemFilter]);


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
                            value={filterId}
                            onChange={(e) => setFilterId(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip title="Reload">
                            <IconButton onClick={handleFilterMenuOpen}>
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
            <Menu
                id="basic-menu"
                anchorEl={filterMenu}
                open={openFilter}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                sx={{ width: 400 }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setShowPendingItemFilter(!showPendingItemFilter);
                    }}
                >
                    {showPendingItemFilter ? <DoneIcon /> : <Icon />}
                    Chờ khám
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setShowDoneItemFilter(!showDoneItemFilter);
                    }}
                >
                    {showDoneItemFilter ? <DoneIcon /> : <Icon />}
                    Đã khám
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setShowLateItemFilter(!showLateItemFilter);
                    }}
                >
                    {showLateItemFilter ? <DoneIcon /> : <Icon />}
                    Đã muộn
                </MenuItem>
            </Menu>
            <ToastContainer />
        </Paper>
    );
}
