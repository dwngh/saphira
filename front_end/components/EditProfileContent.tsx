import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
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
import { useAuth } from "../utils/useAuth"
import { UserService } from "../service/UserService"

interface EditProfileContentProps {
    userId;
}

export default function EditProfileContent(props: EditProfileContentProps) {
    const { accessToken, userId } = useAuth();
    const { getUser, updateUser } = UserService()
    const [data, dataSet] = useState<any>({
        address:'',
        anamnesis:'',
        birthday:dayjs('2014-08-18'),
        blood_type:'',
        email:'',
        gender:0,
        height:'',
        hi_num:'',
        id:0,
        identity_num:'',
        name:'',
        password:'',
        phone:'',
        price:'',
        role:'',
        username:'',
        weight:'',
    })

    const handleChangeName = (e) => {
        dataSet(prevState => ({
            ...prevState,
            name: e.target.value
        }));
    }
    const handleChangeBirthday = (value) => {
        dataSet(prevState => ({
            ...prevState,
            birthday: value
        }));
    }
    const handleChangeGender = (e) => {
        dataSet(prevState => ({
            ...prevState,
            gender: e.target.value
        }));
    }
    const handleChangeIden_num = (e) => {
        dataSet(prevState => ({
            ...prevState,
            identity_num: e.target.value
        }));
    }
    const handleChangeAddress = (e) => {
        dataSet(prevState => ({
            ...prevState,
            address: e.target.value
        }));
    }
    const handleChangePhone = (e) => {
        dataSet(prevState => ({
            ...prevState,
            phone: e.target.value
        }));
    } 
    const handleChangeEmail = (e) => {
        dataSet(prevState => ({
            ...prevState,
            email: e.target.value
        }));
    }
    const handleChangeHi_num = (e) => {
        dataSet(prevState => ({
            ...prevState,
            hi_num: e.target.value
        }));
    }
    const handleChangeHeight = (e) => {
        dataSet(prevState => ({
            ...prevState,
            height: e.target.value
        }));
    }
    const handleChangeWeight = (e) => {
        dataSet(prevState => ({
            ...prevState,
            weight: e.target.value
        }));
    }
    const handleChangeBlood_type = (e) => {
        dataSet(prevState => ({
            ...prevState,
            blood_type: e.target.value
        }));
    }
    const handleChangeAnamnesis = (e) => {
        dataSet(prevState => ({
            ...prevState,
            anamnesis: e.target.value
        }));
    }
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleSaveConfirm = () => {
        setOpenConfirm(true);
    }

    const handleClose = () => {
        setOpenConfirm(false);
    }

    const handleSave = async () => {
        setOpenConfirm(false);
        const respone = await updateUser(data, accessToken)
        console.log(respone)
    }

    useEffect(() => {
        async function fetchMyAPI() {
          let response = await getUser(props.userId, accessToken)
          dataSet(response)
        }
        fetchMyAPI()
    }, [])
    console.log(data)
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
                        value={data.name}
                        onChange={handleChangeName}
                    />
                </Grid>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Ngày sinh"
                            inputFormat="DD/MM/YYYY"
                            value={data.birthday}
                            onChange={handleChangeBirthday}
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
                        value={data.gender}
                        label="Gender"
                        onChange={handleChangeGender}
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
                        value={data.identity_num}
                        onChange={handleChangeIden_num}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Địa chỉ"
                        multiline
                        rows={2}
                        maxRows={4}
                        value={data.address}
                        onChange={handleChangeAddress}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Điện thoại"
                        multiline
                        maxRows={1}
                        value={data.phone}
                        onChange={handleChangePhone}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Email"
                        multiline
                        maxRows={1}
                        value={data.email}
                        onChange={handleChangeEmail}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={0}
                        label="Vai trò"
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
                        value={data.hi_num}
                        onChange={handleChangeHi_num}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControl
                        sx={{ ml: 3, width: "15ch" }}
                        variant="outlined"
                    >
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            value={data.height}
                            onChange={handleChangeHeight}
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
                            value={data.weight}
                            onChange={handleChangeWeight}
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
                        value={data.blood_type}
                        label="Nhóm máu"
                        onChange={handleChangeBlood_type}
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
                        multiline
                        value={data.anamnesis}
                        rows={7}
                        sx={{ marginTop: 3 }}
                        fullWidth={true}
                        onChange={handleChangeAnamnesis}
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
