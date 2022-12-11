import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DescriptionCard from "./card/DescriptionCard";

interface DescriptionContentProps {
    isCompleted?: boolean;
    description?;
    setDescription?;
    onNextTab;
    onPreviousTab;
}

export default function DescriptionContent(props: DescriptionContentProps) {
    const handleSubmit = (value) => {
        props.setDescription(value);
        props.onNextTab();
    }

    return (
        <Paper
            sx={{
                maxWidth: 936,
                margin: "auto",
                overflow: "auto",
                height: 450,
            }}
        >
            <DescriptionCard
                description={props?.description}
                setDescription={handleSubmit}
                onCancel={props.onPreviousTab}
            />
        </Paper>
    );
}
