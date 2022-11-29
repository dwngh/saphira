import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

interface EditProfileContentProps {}

export default function EditProfileContent(props: EditProfileContentProps) {
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleSaveConfirm = () => {
        setOpenConfirm(true);
    }

    const handleClose = () => {
        setOpenConfirm(false);
    }

    const handleSave = () => {
        setOpenConfirm(false);
        // Save abcxyz
    }

    return (
        <Paper
            sx={{
                maxWidth: 950,
                margin: "auto",
                overflow: "auto",
                height: 500,
                padding: 4,
            }}
        >
            <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: "bold", marginBottom: 4 }}
            >
                Cập nhật thông tin
            </Typography>
            <Divider>
                <Typography variant="caption" color="#9e9e9e">
                    Thông tin định danh
                </Typography>
            </Divider>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Họ và tên"
                        multiline
                        maxRows={4}
                        value={"Nguyễn Văn A"}
                        onChange={() => {
                            console.log("I'm changing!!");
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Ngày sinh"
                            inputFormat="MM/DD/YYYY"
                            value={dayjs()}
                            onChange={() => {}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                    <FormHelperText
                        id="outlined-weight-helper-text"
                        sx={{ mt: -2.5 }}
                    >
                        Giới tính
                    </FormHelperText>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={0}
                        label="Age"
                        onChange={() => {}}
                        sx={{}}
                    >
                        <MenuItem value={0}>Nam</MenuItem>
                        <MenuItem value={1}>Nữ</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="CCCD"
                        multiline
                        maxRows={4}
                        value={"123455789"}
                        onChange={() => {
                            console.log("I'm changing!!");
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Địa chỉ"
                        multiline
                        rows={2}
                        maxRows={4}
                        value={
                            "510B - KTX Ngoại Ngữ - Xuân Thủy - Cầu Giấy - Hà Nội"
                        }
                        onChange={() => {
                            console.log("I'm changing!!");
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Điện thoại"
                        multiline
                        maxRows={1}
                        value={"0334816745"}
                        onChange={() => {
                            console.log("I'm changing!!");
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Email"
                        multiline
                        maxRows={1}
                        value={"aa@ppp.com"}
                        onChange={() => {
                            console.log("I'm changing!!");
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={0}
                        label="Nhóm máu"
                        onChange={() => {}}
                        sx={{}}
                        disabled
                    >
                        <MenuItem value={0}>Bệnh nhân</MenuItem>
                    </Select>
                    <FormHelperText
                        id="outlined-weight-helper-text"
                        sx={{ ml: 1 }}
                    >
                        Vai trò
                    </FormHelperText>
                </Grid>
            </Grid>
            <Divider>
                <Typography variant="caption" color="#9e9e9e">
                    Thông tin bệnh nhân
                </Typography>
            </Divider>
            <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={3}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Số BHYT"
                        multiline
                        maxRows={4}
                        value={"9812749872394"}
                        onChange={() => {
                            console.log("I'm changing!!");
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControl
                        sx={{ ml: 3, width: "15ch" }}
                        variant="outlined"
                    >
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            value={183}
                            onChange={() => {}}
                            endAdornment={
                                <InputAdornment position="end">
                                    cm
                                </InputAdornment>
                            }
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight",
                            }}
                        />
                        <FormHelperText id="outlined-weight-helper-text">
                            Chiều cao
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl
                        sx={{ ml: 3, width: "15ch" }}
                        variant="outlined"
                    >
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            value={73}
                            onChange={() => {}}
                            endAdornment={
                                <InputAdornment position="end">
                                    kg
                                </InputAdornment>
                            }
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight",
                            }}
                        />
                        <FormHelperText id="outlined-weight-helper-text">
                            Cân nặng
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormHelperText
                        id="outlined-weight-helper-text"
                        sx={{ mt: -2.5 }}
                    >
                        Nhóm máu
                    </FormHelperText>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={3}
                        label="Nhóm máu"
                        onChange={() => {}}
                        sx={{}}
                    >
                        <MenuItem value={0}>A</MenuItem>
                        <MenuItem value={1}>B</MenuItem>
                        <MenuItem value={2}>AB</MenuItem>
                        <MenuItem value={3}>O</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Tiểu sử bệnh:
                    </Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label="Tiểu sử bệnh"
                        defaultValue={"Có tiền sử hen suyễn"}
                        multiline
                        rows={7}
                        sx={{ marginTop: 3 }}
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
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
                    sx={{ height: 40, borderRadius: 28, marginRight: 2 }}
                    onClick={() => {}}
                >
                    Hủy
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ height: 40, borderRadius: 28 }}
                    onClick={handleSaveConfirm}
                >
                    Lưu
                </Button>
            </Box>
            <Dialog
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thay đổi thông tin"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn muốn lưu những thông tin vừa thay đổi chứ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSave} autoFocus>
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
