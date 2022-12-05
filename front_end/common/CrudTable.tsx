import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/useAuth";
import FormDialog from "./CrudDialog";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface CrudTableProps {
    columns: CrudColumn[];
    item;
    createItem?;
    getItems?;
    updateItem?;
    deleteItem?;
}

export interface CrudColumn {
    id: string;
    label: string;
    minWidth?: number;
    align?;
    isFormat?;
    format?;
    input?;
    props?: any;
}

export default function CrudTable(props: CrudTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { accessToken, userId } = useAuth();
    const [itemList, setItemList] = useState<typeof props.item>([]);
    const [columns, setColumns] = useState<CrudColumn[]>([]);
    const [item, setItem] = useState<typeof props.item>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsEdit(false);
        setItem(props.item);
    };

    const handleFormSubmit = async (item) => {
        let temp = { ...item };
        if (isEdit) {
            await props.updateItem(temp, accessToken);
            console.log("Item update request sent!");
            setIsEdit(false);
            setItem(props.item);
            await fetchData();
        } else {
            delete temp["id"];
            await props.createItem(temp, accessToken);
            console.log("Create new item request sent!");
            await fetchData();
        }
        
    };

    const handleEdit = (e) => {
        let id = +e.currentTarget.id;
        let temp = itemList.filter((item) => item.id == id)[0];
        setItem(temp);
        setIsEdit(true);
    };

    const handleDelete = async(e) => {
        let id = +e.currentTarget.id;
        let temp = await props.deleteItem(id, accessToken);
        if (temp?.affected == 1) toast.success("Item deleted");
        else toast.warning("Deletion cannot be done!");
        await fetchData();
    }

    useEffect(() => {
        if (isEdit) handleClickOpenDialog();
    }, [item])

    const fetchData = async () => {
        let items = await props.getItems(accessToken);
        setItemList(items);
    };

    useEffect(() => {
        fetchData();
        let c = [...props.columns];
        c.push({
            id: "action",
            label: "Hành động",
            minWidth: 150,
        });
        setColumns(c);
        setItem(props.item);
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
                            {props.columns.map((column) => (
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
                        {itemList
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
                                                        <Tooltip title="Chỉnh sửa">
                                                            <IconButton
                                                                id={
                                                                    row["id"] +
                                                                    ""
                                                                }
                                                                onClick={
                                                                    handleEdit
                                                                }
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Xóa">
                                                            <IconButton
                                                                id={
                                                                    row["id"] +
                                                                    ""
                                                                }
                                                                onClick={handleDelete}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                );
                                            }
                                            let value: any = row[column.id];
                                            if (column.isFormat)
                                                value = column.format(value);
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
                count={itemList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box
                m={2}
                //margin
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleClickOpenDialog}
                >
                    <AddIcon />
                </Fab>
                <FormDialog
                    columns={props.columns}
                    open={openDialog}
                    onClose={handleCloseDialog}
                    item={item}
                    onSubmit={handleFormSubmit}
                    isEdit={isEdit}
                />
            </Box>
            <ToastContainer />
        </Paper>
    );
}
