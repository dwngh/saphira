import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { useAuth } from "../../../utils/useAuth";
import { Button, TablePagination } from "@mui/material";
import FileService from "../../../service/FileService";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import { OrderService } from "../../../service/OrderService";
import { toast } from "react-toastify";

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function Row(props: { row; token; onReload; canSeeAttachment: boolean }) {
    const { row, canSeeAttachment } = props;
    const [open, setOpen] = React.useState(false);
    const { uploadFile, downloadFile } = FileService();
    const handleFileUpload = async (e) => {
        let id = e.target.id;
        const file = e.target.files[e.target.files.length - 1];
        if (file.size > 16777215) {
            toast.warning("Chỉ hỗ trợ file nhỏ hơn 16MB");
            return;
        }
        let formData = new FormData();

        formData.append("file", file);
        formData.append("orderId", id);
        formData.append("type", file.type);
        let result = await uploadFile(formData, props.token);
        if (result?.status == 201) {
            toast.success("Đã tải lên một tệp đính kèm");
            props.onReload();
        } else toast.warning("Tệp chưa được tải lên");
    };

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {row.id}
                </TableCell>
                <TableCell align="center">{row?.patient?.name}</TableCell>
                <TableCell align="center">{row?.doctor?.name}</TableCell>
                <TableCell align="center">
                    {dayjs(row?.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="center">
                    <Button
                        component="label"
                        variant="outlined"
                        sx={{ marginRight: "1rem" }}
                    >
                        <FileUploadIcon />
                        <input
                            id={row.id}
                            type="file"
                            hidden
                            onChange={handleFileUpload}
                        />
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {canSeeAttachment ? (
                            <Box sx={{ margin: 1 }}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                >
                                    Đính kèm
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Tên file</TableCell>
                                            <TableCell align="center">
                                                Kích thước
                                            </TableCell>
                                            <TableCell align="center">
                                                Người tải lên
                                            </TableCell>
                                            <TableCell align="center">
                                                Ngày tải lên
                                            </TableCell>
                                            <TableCell align="center">
                                                Hành động
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.attachments.map((historyRow) => (
                                            <TableRow key={historyRow.id}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {historyRow.id}
                                                </TableCell>
                                                <TableCell>
                                                    {historyRow?.fileName}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {formatBytes(
                                                        historyRow?.size
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {dayjs(
                                                        historyRow?.created_at
                                                    ).format(
                                                        "HH:mm DD/MM/YYYY"
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {historyRow?.author?.name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        onClick={() =>
                                                            downloadFile(
                                                                historyRow?.id
                                                            )
                                                        }
                                                    >
                                                        <DownloadIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        ) : (
                            <Typography variant="body2">
                                Bạn không có quyền truy cập vào file đính kèm
                                của yêu cầu này
                            </Typography>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function AttachmentTable() {
    const { accessToken, userId } = useAuth();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orders, setOrders] = useState<any>([]);
    const { uploadFile } = FileService();
    const { getOrdersWithAttachment } = OrderService();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const fetchData = async () => {
        const temp = await getOrdersWithAttachment(accessToken);
        setOrders(temp);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                ID
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                Người khám
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                Bác sĩ
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                Ngày tạo
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                Hành động
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => (
                                <Row
                                    key={row.id}
                                    row={row}
                                    token={accessToken}
                                    onReload={fetchData}
                                    canSeeAttachment={row.doctorId == userId}
                                />
                            ))}
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
        </>
    );
}
