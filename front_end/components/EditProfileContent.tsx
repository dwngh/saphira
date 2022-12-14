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
            gender: e.target.value === "true" ? true : false,
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
        if (response?.status == 201 || response.affected == 1)
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
                {props.registering ? "T???o t??i kho???n m???i" : "C???p nh???t th??ng tin"}
            </Typography>
            {props.registering && (
                <>
                    <Divider>
                        <Typography variant="caption" color="#9e9e9e">
                            Th??ng tin t??i kho???n
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
                    Th??ng tin ?????nh danh
                </Typography>
            </Divider>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="H??? v?? t??n"
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
                            label="Ng??y sinh"
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
                        Gi???i t??nh
                    </FormHelperText>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data.gender}
                        label="Gender"
                        onChange={handleChangeGender}
                    >
                        <MenuItem value={"true"}>Nam</MenuItem>
                        <MenuItem value={"false"}>N???</MenuItem>
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
                        label="?????a ch???"
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
                        label="??i???n tho???i"
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
                            label="Vai tr??"
                            onChange={handleChangeRole}
                        >
                            <MenuItem value={0}>Admin</MenuItem>
                            <MenuItem value={1}>B???nh nh??n</MenuItem>
                            <MenuItem value={2}>Th?? k??</MenuItem>
                            <MenuItem value={3}>B??c s??</MenuItem>
                        </Select>
                    ) : (
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.role}
                            label="Vai tr??"
                            disabled
                        >
                            <MenuItem value={0}>Admin</MenuItem>
                            <MenuItem value={1}>B???nh nh??n</MenuItem>
                            <MenuItem value={2}>Th?? k??</MenuItem>
                            <MenuItem value={3}>B??c s??</MenuItem>
                        </Select>
                    )}
                    <FormHelperText
                        id="outlined-weight-helper-text"
                        sx={{ ml: 1 }}
                    >
                        Vai tr??
                    </FormHelperText>
                </Grid>
            </Grid>
            {data.role == 1 && (
                <>
                    <Divider>
                        <Typography variant="caption" color="#9e9e9e">
                            Th??ng tin b???nh nh??n
                        </Typography>
                    </Divider>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="S??? BHYT"
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
                                    Chi???u cao
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
                                    C??n n???ng
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormHelperText
                                id="outlined-weight-helper-text"
                                sx={{ mt: -2.5 }}
                            >
                                Nh??m m??u
                            </FormHelperText>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.blood_type}
                                label="Nh??m m??u"
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
                                Ti???u s??? b???nh:
                            </Typography>
                            <TextField
                                id="outlined-multiline-static"
                                label="Ti???u s??? b???nh"
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
                            Th??ng tin b??c s??
                        </Typography>
                    </Divider>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={4}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.hospitalId}
                                label="B???nh vi???n "
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
                                B???nh vi???n
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={4}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.specialityId}
                                label="Chuy??n ng??nh"
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
                                Chuy??n ng??nh
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
                                    Gi?? ti???n
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
                    H???y
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ height: 40, borderRadius: 28 }}
                    onClick={handleSaveConfirm}
                >
                    L??u
                </Button>
            </Box>
            <Dialog
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thay ?????i th??ng tin"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        B???n ch???c ch???n mu???n l??u nh???ng th??ng tin v???a thay ?????i ch????
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>H???y</Button>
                    <Button onClick={handleSave} autoFocus>
                        L??u
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Paper>
    );
}
