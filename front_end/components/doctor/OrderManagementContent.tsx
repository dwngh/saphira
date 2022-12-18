import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Grid, IconButton, Menu, MenuItem, TextField, Toolbar, Tooltip } from "@mui/material";
import { useAuth } from "../../utils/useAuth";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { OrderService } from "../../service/OrderService";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SwipeableProfile from "../admin/card/SwipeableProfile";
import NoteDialog from "./card/NoteDialog";
import { toast } from "react-toastify";
import DoneDialog from "./card/DoneDialog";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import { Icon } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import InformationDialog from "./card/GeneralInformation";
import InfoIcon from '@mui/icons-material/Info';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?;
    isFormat?;
    format?;
}

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

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 50 },
    {
        id: "patient",
        label: "Người đặt khám",
        minWidth: 90,
        isFormat: true,
        format: (value) => {
            return value.name;
        },
    },
    {
        id: "doctor",
        label: "Bác sĩ",
        minWidth: 90,
        isFormat: true,
        format: (value) => {
            return value.name;
        },
    },
    {
        id: "date",
        label: "Ngày khám",
        minWidth: 90,
        align: "center",
        isFormat: true,
        format: (value) => {
            if (value) return dayjs(value).format("DD/MM/YYYY");
            else return "None";
        },
    },
    {
        id: "shift",
        label: "Ca",
        minWidth: 90,
        align: "center",
        format: (value) => {
            return shiftList[value];
        },
    },
    {
        id: "action",
        label: "Hành động",
        minWidth: 90,
        align: "center",
    },
];

export default function OrderManagementContent() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { accessToken, userId } = useAuth();
    const { getOrdersByDoctor, updateNote, updateDoneOrder } = OrderService();
    const [orderList, setOrderList] = useState<any>([]);
    const [orders, setOrders] = useState<any>([]);
    const [filterId, setFilterId] = useState('');
    const [openSideInfo, setOpenSideInfo] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(-1);
    const [openNoteDialog, setOpenNoteDialog] = useState(false);
    const [currentNote, setCurrentNote] = useState("");
    const [currentOrderId, setCurrentOrderId] = useState(-1);
    const [openDoneDialog, setOpenDoneDialog] = useState(false);
    const [showPendingItemFilter, setShowPendingItemFilter] = useState(true);
    const [showDoneItemFilter, setShowDoneItemFilter] = useState(false);
    const [showLateItemFilter, setShowLateItemFilter] = useState(false);
    const [openInformationDialog, setOpenInformationDialog] = useState(false);
    const [currentInfoOrder, setCurrentInfoOrder] = useState<any>();

    const fetchData = async () => {
        let orders = await getOrdersByDoctor(userId, accessToken);
        console.log(orders);
        setOrderList(orders);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!openNoteDialog) setCurrentNote("");
    }, [openNoteDialog]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleInfo = (e) => {
        let id = +e.currentTarget.id;
        setOpenSideInfo(true);
        setOpenNoteDialog(false);
        setCurrentUserId(id);
    };

    const handleEdit = (e) => {
        let id = +e.currentTarget.id;
        setOpenSideInfo(false);
        setOpenNoteDialog(true);
        setCurrentUserId(id);
        let order = orderList.filter((order) => order.id == id)[0];
        setCurrentNote(order.note);
    };

    const handleSubmit = async (newNote) => {
        let hasChange = !(newNote === currentNote);
        let payload = {
            id: currentUserId,
            note: newNote,
        };
        if (hasChange) {
            let r = await updateNote(payload, accessToken);
            if (r?.affected == 1) {
                toast.success("Đã cập nhật note cho yêu cầu");
                fetchData();
            } else toast.warning("Note chưa được cập nhật, vui lòng thử lại");
        }
        setOpenNoteDialog(false);
    };

    const handleDone = (e) => {
        let id = +e.currentTarget.id;
        setCurrentOrderId(id);
        setOpenDoneDialog(true);        
    };

    const handleDoneSubmit = async() => {
        let id = currentOrderId;
        let r = await updateDoneOrder(id, accessToken);
        if (r?.affected >= 0) {
            toast.success("Đã thay đổi trạng thái của yêu cầu");
            fetchData();
        }
        handleDoneCancel();
    };

    const handleDoneCancel = () => {
        setCurrentOrderId(-1);
        setOpenDoneDialog(false);
    }

    const handleOpenInfoDialog = (e) => {
        let id = +e.currentTarget.id;
        let order = orderList.filter(item => item.id == id)[0];
        setCurrentInfoOrder(order);
        setOpenInformationDialog(true);
    }

    const handleCloseInfoDialog = () => {
        setOpenInformationDialog(false);
    }

    const [filterMenu, setFilterMenu] = useState(null);
    const open = Boolean(filterMenu);

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
            if (a_value.isSame(b_value, "day")) {
                if (a?.shift == b?.shift) {
                    let a_value_c = dayjs(a?.created_at);
                    let b_value_c = dayjs(b?.created_at);
                    if (a_value_c.isBefore(b_value_c, "day")) return -1;
                    else return 1;
                }
                if (a?.shift < b?.shift) return -1;
                else return 1;
            }
            if (a_value.isBefore(b_value, "day")) return -1;
            else return 1;
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
        <Paper sx={{ width: "100%", overflow: "auto" }}>
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <SearchIcon color="inherit" sx={{ display: "block" }} />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            placeholder="Nhập ID yêu cầu ..."
                            InputProps={{
                                disableUnderline: true,
                                sx: { fontSize: "default" },
                            }}
                            variant="standard"
                            value={filterId}
                            onChange={e => setFilterId(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                            <Tooltip title="Bộ lọc">
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
            <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        {columns.map((column) => {
                                            if (column.id == "action") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        <Tooltip title="Thông tin chung">
                                                            <IconButton
                                                                id={
                                                                    row["id"] +
                                                                    ""
                                                                }
                                                                onClick={
                                                                    handleOpenInfoDialog
                                                                }
                                                            >
                                                                <InfoIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Hồ sơ người khám">
                                                            <IconButton
                                                                id={
                                                                    row[
                                                                        "patientId"
                                                                    ] + ""
                                                                }
                                                                onClick={
                                                                    handleInfo
                                                                }
                                                            >
                                                                <AssignmentIndIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Ghi chú của bác sĩ">
                                                            <IconButton
                                                                id={
                                                                    row["id"] +
                                                                    ""
                                                                }
                                                                onClick={
                                                                    handleEdit
                                                                }
                                                            >
                                                                <StickyNote2Icon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Đánh dấu đã hoàn thành">
                                                            <IconButton
                                                                id={
                                                                    row["id"] +
                                                                    ""
                                                                }
                                                                onClick={
                                                                    handleDone
                                                                }
                                                            >
                                                                <TaskAltIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                );
                                            } else {
                                                let value: any = row[column.id];
                                                if (column.isFormat)
                                                    value =
                                                        column.format(value);
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <SwipeableProfile
                open={openSideInfo}
                setOpen={setOpenSideInfo}
                userId={currentUserId}
            />
            <NoteDialog
                note={currentNote}
                open={openNoteDialog}
                setOpen={setOpenNoteDialog}
                onSubmit={handleSubmit}
            />
            <DoneDialog 
                open={openDoneDialog}
                onSubmit={handleDoneSubmit}
                onCancel={handleDoneCancel}
            />
            <InformationDialog 
                open={openInformationDialog}
                order={currentInfoOrder}
                onClose={handleCloseInfoDialog}
            />
            <Menu
                id="basic-menu"
                anchorEl={filterMenu}
                open={open}
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
        </Paper>
    );
}
