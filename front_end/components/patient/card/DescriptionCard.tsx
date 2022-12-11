import * as React from "react";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface DescriptionCardProps {
    isCompleted?;
    description?;
    setDescription?;
    onCancel?;
}

export default function DescriptionCard(props: DescriptionCardProps) {
    const [description, setDescription] = useState("");
    const [isEdit, setIsEdit] = useState(true);

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    useEffect(() => {
        if (props?.description) {
            setDescription(props.description);
        }
        if (props?.isCompleted) {
            setIsEdit(false);
        }
    }, [props.description]);

    const handleSubmit = () => {
        setIsEdit(false);
        props.setDescription(description);
    };
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
            <TextField
                id="outlined-multiline-static"
                label="Thêm ghi chú (nếu có)"
                multiline
                rows={7}
                sx={{ marginBottom: 3 }}
                value={description}
                onChange={handleChange}
                fullWidth
                disabled={!isEdit}
            />
            {isEdit ? (
                <Box
                    m={2}
                    //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    {props?.onCancel && (<Button
                        variant="outlined"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28, marginRight: 2 }}
                        onClick={props.onCancel}
                    >
                        Quay lại
                    </Button>)}
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28 }}
                        onClick={handleSubmit}
                    >
                        Tiếp tục
                    </Button>
                </Box>
            ) : (
                <Box
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
                        onClick={() => setIsEdit(true)}
                    >
                        Chỉnh sửa
                    </Button>
                </Box>
            )}
        </Box>
    );
}
