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
import { HospitalService } from "../../service/HospitalService";
import { SpecialityService } from "../../service/SpecialityService";

interface ChooseDoctorContentProps {
    onNextTab;
    setDoctor;
}

export default function ChooseDoctorContent(props: ChooseDoctorContentProps) {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [doctorList, setDoctorList] = useState<any[]>([]);
    const [filterMenu, setFilterMenu] = useState(null);
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [showHospitalFilter, setShowHospitalFilter] = useState(false);
    const [showSpecialityFilter, setShowSpecialityFilter] = useState(false);
    const [dateFilter, setDateFilter] = useState<Dayjs>();
    const [hospitalFilter, setHospitalFilter] = useState<number>();
    const [specialityFilter, setSpecialityFilter] = useState<number>();
    const [filterName, setFilterName] = useState("");
    const [hospitals, setHospitals] = useState<any[]>([]);
    const [specialities, setSpecialities] = useState<any[]>([]);
    const [dayFilter, setDayFilter] = useState<number>();

    const { accessToken, userId } = useAuth();
    const { getDoctors } = UserService();
    const { getHospitals } = HospitalService();
    const { getSpecialities } = SpecialityService();
    const { getAvailableDayBit } = TimeSolve();

    const handleChangeDate = (newValue: Dayjs) => {
        setDateFilter(newValue);
        let day = newValue.day();
        if (day == 0) day = 6;
        else day = day - 1;
        setDayFilter(day);
    };
    const handleCancelDateFilter = () => {
        setShowDateFilter(false);
        setDayFilter(undefined);
    };

    const handleChangeHospital = (e) => {
        setHospitalFilter(e.target.value);
    };
    const handleCancelHospitalFilter = () => {
        setShowHospitalFilter(false);
        setHospitalFilter(undefined);
    };

    const handleChangeSpeciality = (e) => {
        setSpecialityFilter(e.target.value);
    };
    const handleCancelSpecialityFilter = () => {
        setShowSpecialityFilter(false);
        setSpecialityFilter(undefined);
    };

    const fetchData = async () => {
        const doctors = await getDoctors(accessToken);
        const hospitals = await getHospitals(accessToken);
        const specialities = await getSpecialities(accessToken);
        setDoctorList(doctors);
        setHospitals(hospitals);
        setSpecialities(specialities);
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
            props.setDoctor(id, doctor.calendar, doctor.price, doctor);
            props.onNextTab();
        } else toast.error("Unexpected error!");

    }

    const filterDoctor = (list) => {
        let temp = list;
        if (dayFilter) {
            temp = temp.filter(item => {
                let cal = getAvailableDayBit(item.calendar.avail);
                if (item.calendarId) {
                    let dayAvail = getAvailableDayBit(item.calendar?.avail);
                    return (dayAvail[dayFilter] == '1')
                } else return true;
            })
        }
        if (hospitalFilter) {
            temp = temp.filter(item => item?.hospitalId == hospitalFilter);
        }
        if (specialityFilter) {
            temp = temp.filter(item => item?.specialityId == specialityFilter);
        }
        return temp;
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setDoctors(filterDoctor(doctorList.filter(item => item.name.indexOf(filterName) != -1)));
    }, [doctorList, filterName, dayFilter, hospitalFilter, specialityFilter]);

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
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
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
                                    hospitals={hospitals}
                                />
                            )}
                            {showSpecialityFilter && (
                                <SpecialityFilter
                                    specialities={specialities}
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
                        if (showDateFilter)
                            setDayFilter(undefined);
                    }}
                >
                    {showDateFilter ? <DoneIcon /> : <Icon />}
                    Lọc theo ngày
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setShowHospitalFilter(!showHospitalFilter);
                        if (showHospitalFilter)
                            setHospitalFilter(undefined);
                    }}
                >
                    {showHospitalFilter ? <DoneIcon /> : <Icon />}
                    Lọc theo Bệnh viện
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setShowSpecialityFilter(!showSpecialityFilter);
                        if (showSpecialityFilter)
                            setSpecialityFilter(undefined);
                    }}
                >
                    {showSpecialityFilter ? <DoneIcon /> : <Icon />}
                    Lọc theo Chuyên khoa
                </MenuItem>
            </Menu>
        </Paper>
    );
}
