import { Grid, Paper, TextField, Toolbar } from "@mui/material";
import AttachmentTable from "./card/AttachmentTable";
import { useState } from "react";

interface AttachmentContentProps {}

export default function AttachmentContent(props: AttachmentContentProps) {
    return (
        <Paper
            sx={{
                maxWidth: 1000,
                margin: "auto",
                overflow: "hidden",
                height: 480,
                p: 3,
            }}
        >
            
            <AttachmentTable />
        </Paper>
    );
}
