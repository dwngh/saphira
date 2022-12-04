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
import { useAuth } from "../utils/useAuth";
import { UserService } from "../service/UserService";
import { AuthService } from "../service/AuthService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HospitalService } from "../service/HospitalService";
import { SpecialityService } from "../service/SpecialityService";

interface EditProfileContentProps {
    userId?;
    registering?: boolean;
    privilege?: boolean;
}

export default function EditProfileContent(props: EditProfileContentProps) {
    const { accessToken } = useAuth();
    const { getUser, updateUser } = UserService();
    const { fetchSignUp } = AuthService();
    const { getHospitals } = HospitalService();
    const { getSpecialities } = SpecialityService();
    const [hospitals, setHospitals] = useState<any>([]);
    const [specialities, setSpecialities] = useState<any>([]);
    const [data, dataSet] = useState<any>(
        props.registering
            ? { role: 1 }
            : {
                  address: "",
                  anamnesis: "",
                  birthday: dayjs(),
                  blood_type: 0,
                  email: "",
                  gender: true,
                  height: 0,
                  hi_num: "",
                  id: 0,
                  identity_num: "",
                  name: "",
                  password: "",
                  phone: "",
                  price: 0,
                  role: 1,
                  username: "",
                  weight: 0,
                  hospitalId: 0,
                  specialityId: 0,
              }
    );

    const handleChangeName = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            name: e.target.value,
        }));
    };
    const handleChangeBirthday = (value) => {
        dataSet((prevState) => ({
            ...prevState,
            birthday: value,
        }));
    };
    const handleChangeGender = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            gender: e.target.value,
        }));
    };
    const handleChangeRole = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            role: e.target.value,
        }));
    };
    const handleChangeIden_num = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            identity_num: e.target.value,
        }));
    };
    const handleChangeAddress = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            address: e.target.value,
        }));
    };
    const handleChangePhone = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            phone: e.target.value,
        }));
    };
    const handleChangeEmail = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            email: e.target.value,
        }));
    };
    const handleChangeHi_num = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            hi_num: e.target.value,
        }));
    };
    const handleChangeHeight = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            height: e.target.value,
        }));
    };
    const handleChangeWeight = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            weight: e.target.value,
        }));
    };
    const handleChangeBlood_type = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            blood_type: e.target.value,
        }));
    };
    const handleChangeAnamnesis = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            anamnesis: e.target.value,
        }));
    };
    const handleChangeHospital = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            hospitalId: e.target.value,
        }));
    };
    const handleChangeSpeciality = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            specialityId: e.target.value,
        }));
    };
    const handleChangePrice = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            price: e.target.value,
        }));
    };
    const handleChangeUsername = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            username: e.target.value,
        }));
    };
    const handleChangePassword = (e) => {
        dataSet((prevState) => ({
            ...prevState,
            password: e.target.value,
        }));
    };
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleSaveConfirm = () => {
        setOpenConfirm(true);
    };

    const handleClose = () => {
        setOpenConfirm(false);
    };

    const handleSave = async () => {
        setOpenConfirm(false);
        let response;
        if (props.registering) {
            let temp = { ...data };
            delete temp["id"];
            response = await fetchSignUp(temp);
        } else {
            response = await updateUser(data, accessToken);
        }
        if (response.status == 201 || response.affected == 1)
            toast.success(
                props.registering
                    ? "Registered new account!"
                    : "Updated profile!"
            );
        else toast.error("Error occured! Please try again.");
    };

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await getUser(props.userId, accessToken);
            dataSet(response);
        }
        const fetchDoctorAdditionInfo = async () => {
            let hospital = await getHospitals(accessToken);
            let speciality = await getSpecialities(accessToken);
            setHospitals(hospital);
            setSpecialities(speciality);
        };
        if (!props.registering) {
            fetchMyAPI();
        }
        fetchDoctorAdditionInfo();
    }, []);
    console.log(data);
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
                {props.registering ? "Tạo tài khoản mới" : "Cập nhật thông tin"}
            </Typography>
            {props.registering && (
                <>
                    <Divider>
                        <Typography variant="caption" color="#9e9e9e">
                            Thông tin tài khoản
                        </Typography>
                    </Divider>
                    <Grid container spacing={2} sx={{ padding: 2 }}>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Username"
                                multiline
                                value={data.username}
                                onChange={handleChangeUsername}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Password"
                                type="password"
                                id="password"
                                value={data.password}
                                onChange={handleChangePassword}
                                required
                            />
                        </Grid>
                    </Grid>
                </>
            )}

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
                        required
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
                        required
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
                    {props.privilege ? (
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.role}
                            label="Vai trò"
                            onChange={handleChangeRole}
                        >
                            <MenuItem value={0}>Admin</MenuItem>
                            <MenuItem value={1}>Bệnh nhân</MenuItem>
                            <MenuItem value={2}>Thư ký</MenuItem>
                            <MenuItem value={3}>Bác sĩ</MenuItem>
                        </Select>
                    ) : (
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.role}
                            label="Vai trò"
                            disabled
                        >
                            <MenuItem value={0}>Admin</MenuItem>
                            <MenuItem value={1}>Bệnh nhân</MenuItem>
                            <MenuItem value={2}>Thư ký</MenuItem>
                            <MenuItem value={3}>Bác sĩ</MenuItem>
                        </Select>
                    )}
                    <FormHelperText
                        id="outlined-weight-helper-text"
                        sx={{ ml: 1 }}
                    >
                        Vai trò
                    </FormHelperText>
                </Grid>
            </Grid>
            {data.role == 1 && (
                <>
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
                </>
            )}
            {data.role == 3 && (
                <>
                    <Divider>
                        <Typography variant="caption" color="#9e9e9e">
                            Thông tin bác sĩ
                        </Typography>
                    </Divider>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={4}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.hospitalId}
                                label="Bệnh viện "
                                sx={{ minWidth: 200 }}
                                onChange={handleChangeHospital}
                            >
                                {hospitals.map((hospital) => (
                                    <MenuItem
                                        value={hospital.id}
                                        key={hospital.id}
                                    >
                                        {hospital.name}
                                    </MenuItem>
                                ))}
                                {/* <MenuItem value={0}>Admin</MenuItem> */}
                            </Select>
                            <FormHelperText
                                id="outlined-weight-helper-text"
                                sx={{ ml: 1 }}
                            >
                                Bệnh viện
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={4}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.specialityId}
                                label="Chuyên ngành"
                                sx={{ minWidth: 200 }}
                                onChange={handleChangeSpeciality}
                            >
                                {specialities.map((speciality) => (
                                    <MenuItem
                                        value={speciality.id}
                                        key={speciality.id}
                                    >
                                        {speciality.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText
                                id="outlined-weight-helper-text"
                                sx={{ ml: 1 }}
                            >
                                Chuyên ngành
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl
                                sx={{ ml: 3, width: "15ch" }}
                                variant="outlined"
                            >
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    value={data.price}
                                    onChange={handleChangePrice}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            VND
                                        </InputAdornment>
                                    }
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        "aria-label": "weight",
                                    }}
                                    sx={{ minWidth: 150 }}
                                />
                                <FormHelperText id="outlined-weight-helper-text">
                                    Giá tiền
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </>
            )}
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
            <ToastContainer />
        </Paper>
    );
}
