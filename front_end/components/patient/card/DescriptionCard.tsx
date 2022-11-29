import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface DescriptionCardProps {
    isCompleted: boolean;
    description?;
}

export default function DescriptionCard(props: DescriptionCardProps) {
    return (
        <Box sx={{ margin: 3 }}>
                <Typography
                    variant="h5"
                    component="div"
                    color="primary"
                    sx={{ fontWeight: "bold", marginLeft: 2, marginBottom: 3 }}
                >
                    GHI CHÚ
                </Typography>
                {props.isCompleted ? (
                    <TextField
                        id="outlined-multiline-static"
                        label="Thêm ghi chú (nếu có)"
                        defaultValue={props.description}
                        multiline
                        rows={7}
                        sx={{ marginBottom: 3 }}
                        fullWidth={true}
                        disabled
                    />
                ) : (
                    <TextField
                        id="outlined-multiline-static"
                        label="Thêm ghi chú (nếu có)"
                        multiline
                        rows={7}
                        sx={{ width: 900, marginBottom: 3 }}
                    />
                )}

                {props.isCompleted ? (<Box
                    m={2}
                    //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    {/* <Button
                        variant="outlined"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28, marginRight: 2 }}
                    >
                        Quay lại
                    </Button> */}
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28 }}
                    >
                        Chỉnh sửa
                    </Button>
                </Box>) :(<Box
                    m={2}
                    //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28, marginRight: 2 }}
                    >
                        Quay lại
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28 }}
                    >
                        Tiếp tục
                    </Button>
                </Box>)}
            </Box>
    )
}