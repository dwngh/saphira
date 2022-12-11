import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterListIcon from "@mui/icons-material/FilterList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DoneIcon from "@mui/icons-material/Done";
import { Icon } from "@mui/material";
import { useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import DateFilter from "./filterBox/DateFilter";
import dayjs, { Dayjs } from "dayjs";
import HospitalFilter from "./filterBox/HospitalFilter";
import SpecialityFilter from "./filterBox/SpecialityFilter";
import DoctorCard from "./card/DoctorCard";
import { useAuth } from "../../utils/useAuth";
import { UserService } from "../../service/UserService";
import { toast } from "react-toastify";
import { TimeSolve } from "../../common/time";

interface ChooseDoctorContentProps {
    onNextTab;
    setDoctor;
}

export default function ChooseDoctorContent(props: ChooseDoctorContentProps) {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [filterMenu, setFilterMenu] = useState(null);
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [showHospitalFilter, setShowHospitalFilter] = useState(false);
    const [showSpecialityFilter, setShowSpecialityFilter] = useState(false);
    const [dateFilter, setDateFilter] = useState(dayjs());
    const [hospitalFilter, setHospitalFilter] = useState("");
    const [specialityFilter, setSpecialityFilter] = useState("");

    const { accessToken, userId } = useAuth();
    const { getDoctors } = UserService();
    const { getAvailableDay } = TimeSolve();

    const handleChangeDate = (newValue: Dayjs) => {
        setDateFilter(newValue);
    };
    const handleCancelDateFilter = () => {
        setShowDateFilter(false);
    };

    const handleChangeHospital = (newValue) => {
        setHospitalFilter(newValue);
    };
    const handleCancelHospitalFilter = () => {
        setShowHospitalFilter(false);
    };

    const handleChangeSpeciality = (newValue) => {
        setSpecialityFilter(newValue);
    };
    const handleCancelSpecialityFilter = () => {
        setShowSpecialityFilter(false);
    };

    const fetchData = async () => {
        const doctors = await getDoctors(accessToken);
        console.log("Doctor here!");
        console.log(doctors);
        setDoctors(doctors);
    };

    const open = Boolean(filterMenu);

    const handleFilterMenuOpen = (e) => {
        setFilterMenu(e.currentTarget);
    };

    const handleClose = () => {
        setFilterMenu(null);
    };

    const handleDoctorChoose = (e) => {
        let id = +e.currentTarget.id;
        let doctor = doctors.filter((user) => user.id == id)[0];
        if (doctor) {
            console.log(doctor);
            props.setDoctor(id, doctor.calendar, doctor.price, doctor);
            props.onNextTab();
        } else toast.error("Unexpected error!");
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Paper
            sx={{
                maxWidth: 936,
                margin: "auto",
                overflow: "hidden",
                height: 450,
            }}
        >
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon
                                color="inherit"
                                sx={{ display: "block" }}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Nhập tên bác sĩ ..."
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { fontSize: "default" },
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip title="Bộ lọc">
                                <IconButton onClick={handleFilterMenuOpen}>
                                    <FilterListIcon
                                        color="inherit"
                                        sx={{ display: "block" }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {(showDateFilter || showHospitalFilter || showSpecialityFilter) && (
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
                >
                    <Toolbar>
                        <Grid container spacing={1} alignItems="center">
                            {showDateFilter && (
                                <DateFilter
                                    value={dateFilter}
                                    onCancel={handleCancelDateFilter}
                                    onDateChange={handleChangeDate}
                                />
                            )}
                            {showHospitalFilter && (
                                <HospitalFilter
                                    value={hospitalFilter}
                                    onChange={handleChangeHospital}
                                    onCancel={handleCancelHospitalFilter}
                                />
                            )}
                            {showSpecialityFilter && (
                                <SpecialityFilter
                                    value={specialityFilter}
                                    onChange={handleChangeSpeciality}
                                    onCancel={handleCancelSpecialityFilter}
                                />
                            )}
                        </Grid>
                    </Toolbar>
                </AppBar>
            )}

            <Paper
                style={{
                    maxHeight:
                        showDateFilter ||
                        showHospitalFilter ||
                        showSpecialityFilter
                            ? 350
                            : 400,
                    overflow: "auto",
                }}
                variant="outlined"
                square
            >
                {doctors.map((doctor) => (
                    <DoctorCard
                        id={doctor?.id}
                        hospital={doctor?.hospital?.name}
                        name={doctor.name}
                        speciality={doctor?.speciality?.name}
                        calendar={doctor?.calendar?.avail}
                        price={doctor.price}
                        onDoctorChoose={handleDoctorChoose}
                    />
                ))}
            </Paper>

            <Menu
                id="basic-menu"
                anchorEl={filterMenu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                sx={{ width: 400 }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setShowDateFilter(!showDateFilter);
                    }}
                >
                    {showDateFilter ? <DoneIcon /> : <Icon />}
                    Lọc theo ngày
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setShowHospitalFilter(!showHospitalFilter);
                    }}
                >
                    {showHospitalFilter ? <DoneIcon /> : <Icon />}
                    Lọc theo Bệnh viện
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setShowSpecialityFilter(!showSpecialityFilter);
                    }}
                >
                    {showSpecialityFilter ? <DoneIcon /> : <Icon />}
                    Lọc theo Chuyên khoa
                </MenuItem>
            </Menu>
        </Paper>
    );
}
