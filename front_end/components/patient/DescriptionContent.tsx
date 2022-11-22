import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface DescriptionContentProps {}

export default function DescriptionContent(props: DescriptionContentProps) {
    return (
        <Paper
            sx={{
                maxWidth: 936,
                margin: "auto",
                overflow: "auto",
                height: 450,
            }}
        >
            <Box sx={{ margin: 3 }}>
                <Typography
                    variant="h5"
                    component="div"
                    color="primary"
                    sx={{ fontWeight: "bold", marginLeft: 2, marginBottom: 3}}
                >
                    GHI CHÚ
                </Typography>
                <TextField
                    id="outlined-multiline-static"
                    label="Thêm ghi chú (nếu có)"
                    multiline
                    rows={7}
                    sx={{ width: 900 , marginBottom: 3}}
                />
                <Box
                    m={2}
                    //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28, marginRight: 2}}
                    >
                        Quay lại
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28}}
                    >
                        Tiếp tục
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
