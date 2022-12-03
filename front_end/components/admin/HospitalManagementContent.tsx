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
import { IconButton, TextField, Tooltip } from "@mui/material";
import { UserService } from "../../service/UserService";
import { useAuth } from "../../utils/useAuth";
import { useEffect, useState } from "react";
import User from "../../interface/user";
import { HospitalService } from "../../service/HospitalService";
import Hospital from "../../interface/hospital";
import CrudTable, { CrudColumn } from "../../common/CrudTable";
import ExtendTextfield from "../../common/ExtendTextField";

// interface Column {
//     id: string;
//     label: string;
//     minWidth?: number;
//     align?;
//     isFormat?;
//     format?;
// }

const columns: CrudColumn[] = [
    { id: "id", label: "ID", minWidth: 30 },
    {
        id: "name",
        label: "Tên bệnh viện",
        minWidth: 150,
        input: TextField,
        props: {
            margin: "normal",
            fullWidth: true,
            id: "name",
            label: "Name",
            name: "name",
        },
    },
    {
        id: "address",
        label: "Địa chỉ",
        minWidth: 150,
        input: TextField,
        props: {
            margin: "normal",
            fullWidth: true,
            id: "address",
            label: "Address",
            name: "address",
        },
    },
];

const item: Hospital = {
    id: 0,
    name: "",
    address: "",
};

export default function HospitalManagementContent() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { accessToken, userId } = useAuth();
    const { getHospitals, createHospital, updateHospital, deleteHospital } =
        HospitalService();
    const [hospitalList, setHospitalList] = useState<Hospital[]>([]);

    const fetchData = async () => {
        let hospitals = await getHospitals(accessToken);
        setHospitalList(hospitals);
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
        <CrudTable
            columns={columns}
            item={item}
            getItems={getHospitals}
            createItem={createHospital}
            updateItem={updateHospital}
        />
    );
}
