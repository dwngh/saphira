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
import ClearIcon from "@mui/icons-material/Clear";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Icon, SwipeableDrawer } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DateFilter from "./filterBox/DateFilter";
import dayjs, { Dayjs } from "dayjs";
import HospitalFilter from "./filterBox/HospitalFilter";
import SpecialityFilter from "./filterBox/SpecialityFilter";
import DoctorCard from "./card/DoctorCard";
import Box from "@mui/material/Box";
import OrderCard from "./card/OrderCard";
import { useState, Fragment } from "react";
import OrderDetailCard from "./card/OrderDetailCard";
import useWindowDimensions from "../../utils/useWindowDimensions";
import DescriptionCard from "./card/DescriptionCard";
import ShiftList from "../time/shiftList";

export default function MyDoctorContent() {
    const { height, width } = useWindowDimensions();
    const [open, setOpen] = useState(false);
    const handleOpenDetail = (id) => {
        console.log("Opening detail of" + id);
        setOpen(true);
    };
    return (
        <Paper
            sx={{
                maxWidth: 936,
                margin: "auto",
                overflow: "hidden",
                height: 450,
            }}
        >
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <SearchIcon color="inherit" sx={{ display: "block" }} />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            placeholder="ID Yêu cầu ..."
                            InputProps={{
                                disableUnderline: true,
                                sx: { fontSize: "default" },
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip title="Reload">
                            <IconButton onClick={() => {}}>
                                <FilterListIcon
                                    color="inherit"
                                    sx={{ display: "block" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
            <Paper
                style={{
                    maxHeight: 400,
                    overflow: "auto",
                }}
                variant="outlined"
                square
            >
                <OrderCard
                    item={{
                        id: 123,
                        status: 0,
                        doctor: "abc",
                        time: "Ca 7h00 - 8h00 30-2-2050",
                        address: "Sao hỏa",
                        note: "Nhớ đem theo đĩa bay",
                    }}
                    onOpenDetail={handleOpenDetail}
                    attachments={[
                        { name: "Don-thuoc.doc", href: "#" },
                        { name: "ket-qua-xet-nghiem-mau.pdf", href: "#" },
                    ]}
                />
                <OrderCard
                    item={{
                        id: 133,
                        status: 1,
                        doctor: "abc",
                        time: "Ca 7h00 - 8h00 30-2-2050",
                        address: "Sao hỏa",
                    }}
                    onOpenDetail={handleOpenDetail}
                    attachments={[
                        { name: "Don-thuoc.doc", href: "#" },
                        { name: "ket-qua-xet-nghiem-mau.pdf", href: "#" },
                        { name: "ketqua.pdf", href: "#" },
                        { name: "ket-qua-xet-nghiem-mau.pdf", href: "#" },
                    ]}
                />
                <OrderCard
                    item={{
                        id: 143,
                        status: 2,
                        doctor: "abc",
                        time: "Ca 7h00 - 8h00 30-2-2050",
                        address: "Sao hỏa",
                    }}
                    onOpenDetail={handleOpenDetail}
                    attachments={[]}
                />
                <OrderCard
                    item={{
                        id: 153,
                        status: 3,
                        doctor: "abc",
                        time: "Ca 7h00 - 8h00 30-2-2050",
                        address: "Sao hỏa",
                    }}
                    onOpenDetail={handleOpenDetail}
                    attachments={[]}
                />
            </Paper>
            <Fragment>
                <SwipeableDrawer
                    anchor="right"
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                >
                    <Paper
                        sx={{
                            padding: 5,
                            height: height,
                            overflow: "auto",
                            backgroundColor: "#eaeff1",
                        }}
                    >
                        <AppBar
                            color="primary"
                            position="relative"
                            sx={{
                                marginTop: -5,
                                marginBottom: 5,
                                marginRight: -5,
                                marginLeft: -5,
                                padding: 3,
                                width: 800,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: "bold", margin: 1 }}
                            >
                                CHI TIẾT YÊU CẦU
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{ marginLeft: 1 }}
                            >
                                Vì một số lí do, sau khi tạo yêu cầu người dùng
                                sẽ chỉ được chỉnh sửa ca khám và mô tả thêm của
                                yêu cầu.
                            </Typography>
                        </AppBar>
                        <OrderDetailCard
                            patient={{
                                name: "Minh",
                                email: "minh2ten@zz.com",
                                birthday: "30-2-2002",
                                phone: "0123456678",
                            }}
                            doctor={{
                                name: "Huy",
                                speciality: "ppppp",
                                shift: 1,
                                date: "30-2-2050",
                                location: "Sao hỏa",
                            }}
                            price={100000}
                            shift={5}
                            date="30-2-2022"
                            isCreated={false}
                        />
                        <Paper sx={{ margin: 2, padding: 5 }} elevation={3}>
                            <Typography
                                variant="h5"
                                color="primary"
                                sx={{ fontWeight: "bold", marginLeft: 3 }}
                            >
                                CA KHÁM
                            </Typography>
                            <ShiftList
                                choosedShift={null}
                                onChooseShift={(e) => {}}
                                enable={false}
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
                                    sx={{ height: 40, borderRadius: 28 }}
                                >
                                    Chỉnh sửa
                                </Button>
                            </Box>
                        </Paper>
                        <Paper sx={{ margin: 2, padding: 3 }} elevation={3}>
                            <DescriptionCard
                                isCompleted={true}
                                description={"Abcxyz"}
                            />
                        </Paper>
                    </Paper>
                </SwipeableDrawer>
            </Fragment>
        </Paper>
    );
}
