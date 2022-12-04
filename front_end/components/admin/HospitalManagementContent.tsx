import * as React from "react";
import { TextField } from "@mui/material";
import { HospitalService } from "../../service/HospitalService";
import Hospital from "../../interface/hospital";
import CrudTable, { CrudColumn } from "../../common/CrudTable";

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
    const { getHospitals, createHospital, updateHospital, deleteHospital } =
        HospitalService();



    return (
        <CrudTable
            columns={columns}
            item={item}
            getItems={getHospitals}
            createItem={createHospital}
            updateItem={updateHospital}
            deleteItem={deleteHospital}
        />
    );
}
