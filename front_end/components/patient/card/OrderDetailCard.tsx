import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from '@mui/icons-material/Today';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import dayjs from "dayjs";

interface OrderDetailCardProps {
    id?;
    patient;
    doctor;
    status?;
    isCreated;
}

const shiftList = [
    "7h00 - 8h00",
    "8h00 - 9h00",
    "9h00 - 10h00",
    "10h00 - 11h00",
    "13h30 - 14h30",
    "14h30 - 15h30",
    "15h30 - 16h30",
    "16h30 - 17h30",
];

const typographyStyle = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
};

const iconStyle = {
    marginRight: 1,
};

export default function OrderDetailCard(props: OrderDetailCardProps) {
    return (
        <Paper
            sx={{
                marginLeft: 2,
                marginRight: 2,
                paddingTop: 3,
                paddingRight: 5,
                paddingLeft: 5,
                paddingBottom: 2,
            }}
            elevation={4}
        >
            <Typography variant="h5" align="center">
                PHIẾU KHÁM BỆNH
            </Typography>
            <Divider></Divider>
            <Grid container>
                <Grid item xs>
                    <Typography variant="h6" align="center">
                        NGƯỜI KHÁM
                    </Typography>
                    <Grid container>
                        <Grid item xs>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle, fontWeight: "bold" }}
                            >
                                <PersonIcon
                                    fontSize="small"
                                    sx={{ ...iconStyle }}
                                />
                                Họ và tên:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle, fontWeight: "bold" }}
                            >
                                <CalendarMonthIcon
                                    fontSize="small"
                                    sx={{ ...iconStyle }}
                                />
                                Ngày sinh:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle, fontWeight: "bold" }}
                            >
                                <PhoneIcon
                                    fontSize="small"
                                    sx={{ ...iconStyle }}
                                />
                                Số điện thoại:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle, fontWeight: "bold" }}
                            >
                                <EmailIcon
                                    fontSize="small"
                                    sx={{ ...iconStyle }}
                                />
                                Email:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle }}
                            >
                                {props.patient.name + ' '}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle }}
                            >
                                {props.patient.birthday + ' '}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle }}
                            >
                                {props.patient.phone + ' '}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle }}
                            >
                                {props.patient.email + ' '}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider orientation="vertical" flexItem></Divider>
                <Grid item xs>
                    <Typography variant="h6" align="center">
                        CA KHÁM
                    </Typography>
                    <Grid container sx={{paddingLeft: 3}}>
                        <Grid item xs>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle, fontWeight: "bold" }}
                            >
                                <PersonIcon
                                    fontSize="small"
                                    sx={{ ...iconStyle }}
                                />
                                Bác sĩ:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle, fontWeight: "bold" }}
                            >
                                <MedicalServicesIcon
                                    fontSize="small"
                                    sx={{ ...iconStyle }}
                                />
                                Chuyên khoa:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle, fontWeight: "bold" }}
                            >
                                <AccessTimeIcon
                                    fontSize="small"
                                    sx={{ ...iconStyle }}
                                />
                                Ca:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle, fontWeight: "bold" }}
                            >
                                <TodayIcon
                                    fontSize="small"
                                    sx={{ ...iconStyle }}
                                />
                                Ngày:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle, fontWeight: "bold" }}
                            >
                                <LocationOnIcon
                                    fontSize="small"
                                    sx={{ ...iconStyle }}
                                />
                                Địa điểm:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle, fontWeight: "bold" }}
                            >
                                <MonetizationOnIcon
                                    fontSize="small"
                                    sx={{ ...iconStyle }}
                                />
                                Giá tiền:
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle }}
                            >
                                {props.doctor.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle }}
                            >
                                {props.doctor.speciality + ' '}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle }}
                            >
                                {shiftList[props.doctor.shift] + ' '}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle }}
                            >
                                {dayjs(props.doctor.date).format("DD-MM-YYYY") + ' '}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle }}
                            >
                                {props.doctor.location + ' '}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ ...typographyStyle }}
                            >
                                {props.doctor.price ? props.doctor.price.toLocaleString("en-US") : ''} VNĐ
                            </Typography>
                            <br />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider></Divider>
            
        </Paper>
    );
}
