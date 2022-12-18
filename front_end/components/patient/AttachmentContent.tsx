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
import FileService from "../../service/FileService";
import { useAuth } from "../../utils/useAuth";
import dayjs from "dayjs";
import { formatBytes } from "../../common/files";
import { useRouter } from "next/router";
import LaunchIcon from '@mui/icons-material/Launch';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?;
    isFormat?;
    format?;
}

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 70 },
    { id: "fileName", label: "Tệp đính kèm", minWidth: 200 },
    {
        id: "created_at",
        label: "Ngày tạo",
        minWidth: 120,
        isFormat: true,
        format: (value) => dayjs(value).format("HH:mm DD/MM/YYYY"),
    },
    {
        id: "author",
        label: "Người đính kèm",
        minWidth: 120,
        align: "center",
        isFormat: true,
        format: (value) => value.name
    },
    {
        id: "size",
        label: "Kích thước",
        minWidth: 80,
        align: "center",
        isFormat: true,
        format: (value) => formatBytes(value)
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
    const [attachments, setAttachments] = React.useState<any>([]);
    const { accessToken, userId } = useAuth();
    const router = useRouter();
    const { getAttachmentByPatientId, downloadFile } = FileService();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const fetchData = async () => {
        let items = await getAttachmentByPatientId(userId, accessToken);
        setAttachments(items);
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const handleDownload = (e) => {
        let id = +e.currentTarget.id;
        downloadFile(id);
    };

    const handleOpen = (e) => {
        let id = e.currentTarget.id;
        router.push({
            pathname: "/patient/orders",
            query: { orderId: id },
        });
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
                        {attachments
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
                                                        <Tooltip title="Mở yêu cầu">
                                                            <IconButton
                                                                id={
                                                                    row?.order?.id +
                                                                    ""
                                                                }
                                                                onClick={
                                                                    handleOpen
                                                                }
                                                            >
                                                                <LaunchIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                );
                                            } else {
                                                let value = row[column.id];
                                                if (column?.isFormat) value = column.format(value)
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
                count={attachments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
