import * as React from "react";
import { TextField } from "@mui/material";
import CrudTable, { CrudColumn } from "../../common/CrudTable";
import Speciality from "../../interface/speciality";
import { SpecialityService } from "../../service/SpecialityService";

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
        label: "Tên Chuyên ngành",
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
];

const item: Speciality = {
    id: 0,
    name: "",
};

export default function SpecialityManagementContent() {
    const { getSpecialities, createSpeciality, updateSpeciality, deleteSpeciality } =
        SpecialityService();



    return (
        <CrudTable
            columns={columns}
            item={item}
            getItems={getSpecialities}
            createItem={createSpeciality}
            updateItem={updateSpeciality}
            deleteItem={deleteSpeciality}
        />
    );
}
