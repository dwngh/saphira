import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton, Tooltip } from "@mui/material";
import { UserService } from "../../service/UserService";
import { useAuth } from "../../utils/useAuth";
import { useEffect, useState } from "react";
import User from "../../interface/user";

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?;
    isFormat?;
    format?;
}

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "name", label: "Họ tên", minWidth: 90 },
    {
        id: "gender",
        label: "Giới tính",
        minWidth: 50,
        isFormat: true,
        format: (value) => {
            if (value) return "Nữ";
            else return "Nam";
        },
    },
    {
        id: "username",
        label: "Tên tài khoản",
        minWidth: 90,
    },
    {
        id: "birthday",
        label: "Ngày sinh",
        minWidth: 90,
        align: "center",
    },
    {
        id: "phone",
        label: "Điện thoại",
        minWidth: 90,
        align: "center",
    },
    {
        id: "email",
        label: "Email",
        minWidth: 90,
        align: "center",
    },
    {
        id: "role",
        label: "Vai trò",
        minWidth: 90,
        align: "center",
    },
    {
        id: "address",
        label: "Địa chỉ",
        minWidth: 90,
        align: "center",
    },
];


export default function AccountListContent() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { accessToken, userId } = useAuth();
    const { getUsers } = UserService();
    const [userList, setUserList] = useState<User[]>([]);

    const fetchData = async () => {
        let users = await getUsers(accessToken);
        setUserList(users);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "auto" }}>
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
                        {userList
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
                                            let value : any = row[column.id];
                                            if (column.isFormat) value = column.format(value);
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {value}
                                                </TableCell>
                                            );
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
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
