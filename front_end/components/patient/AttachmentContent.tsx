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

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?;
}

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 70 },
    { id: "file", label: "Tệp đính kèm", minWidth: 200 },
    {
        id: "createdAt",
        label: "Ngày tạo",
        minWidth: 120,
    },
    {
        id: "author",
        label: "Người đính kèm",
        minWidth: 120,
        align: "center",
    },
    {
        id: "action",
        label: "Hành động",
        minWidth: 170,
        align: "center",
    },
];

interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}

const rows = [
    {
        id: 11,
        file: "Ket-qua-xet-nghiem.pdf",
        createdAt: "30-2-2050",
        author: "Còn ai là vua đất này",
        href: "#",
    },
    {
        id: 22,
        file: "Ket-qua-xet-nghiem.pdf",
        createdAt: "30-2-2050",
        author: "Còn ai là vua đất này",
        href: "#",
    },
    {
        id: 34,
        file: "Ket-qua-xet-nghiem.pdf",
        createdAt: "30-2-2050",
        author: "Còn ai là vua đất này",
        href: "#",
    },
    {
        id: 234,
        file: "Ket-qua-xet-nghiem.pdf",
        createdAt: "30-2-2050",
        author: "Còn ai là vua đất này",
        href: "#",
    },
    {
        id: 1234,
        file: "Ket-qua-xet-nghiem.pdf",
        createdAt: "30-2-2050",
        author: "Còn ai là vua đất này",
        href: "#",
    },
    {
        id: 111,
        file: "Ket-qua-xet-nghiem.pdf",
        createdAt: "30-2-2050",
        author: "Còn ai là vua đất này",
        href: "#",
    },
];

export default function AttachmentContent() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleDownload = (e) => {
        let id = e.currentTarget.id;
        console.log("Download id: " + id);
    };

    const handleOpen = (e) => {
        let id = e.currentTarget.id;
        console.log("Open id: " + id);
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
                        {rows
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
                                                        <Tooltip title="Xem trước">
                                                            <IconButton
                                                                id={
                                                                    row["id"] +
                                                                    ""
                                                                }
                                                                onClick={
                                                                    handleOpen
                                                                }
                                                            >
                                                                <VisibilityIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Tải xuống">
                                                            <IconButton
                                                                id={
                                                                    row["id"] +
                                                                    ""
                                                                }
                                                                onClick={
                                                                    handleDownload
                                                                }
                                                            >
                                                                <DownloadIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                );
                                            } else {
                                                const value = row[column.id];
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
