import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaidIcon from "@mui/icons-material/Paid";
import { TimeSolve } from "../../../common/time";
import { useEffect, useState } from "react";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";

const cardStyle = {
    marginLeft: 2,
    marginRight: 2,
    marginTop: 1,
    marginBottom: 1,
};

const typographyStyle = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
};

const iconStyle = {
    marginRight: 3,
};

interface DoctorCardProps {
    id;
    name;
    hospital?;
    speciality;
    calendar;
    price;
    onDoctorChoose;
}

export default function DoctorCard(props: DoctorCardProps) {
    const [ calendar, setCalendar ] = useState("");
    const { getAvailableDay } = TimeSolve();
    useEffect(() => {
        let temp = getAvailableDay(props.calendar ?? "00000000000000000000000000000000000000000000000000000000");
        setCalendar(temp?.join(", "));
    }, [props?.calendar])
    return (
        <Card sx={cardStyle} elevation={2} key={props.id}>
            <CardActionArea id={props.id} sx={{ padding: 3 }} onClick={props.onDoctorChoose}>
                <Typography
                    variant="h6"
                    component="div"
                    color="primary"
                    sx={{ fontWeight: "bold", ...typographyStyle }}
                >
                    <PersonIcon sx={{marginLeft: -0.2, ...iconStyle}} />
                    {props.name}
                </Typography>
                <Typography variant="body1" sx={typographyStyle}>
                    <LocalHospitalIcon sx={iconStyle} fontSize="small" />
                    B???nh vi???n: {props.hospital}
                </Typography>
                <Typography variant="body1" sx={typographyStyle}>
                    <MedicalServicesIcon sx={iconStyle} fontSize="small" />
                    Chuy??n khoa: {props.speciality}
                </Typography>
                <Typography variant="body1" sx={typographyStyle}>
                    <CalendarMonthIcon sx={iconStyle} fontSize="small" />
                    L???ch kh??m: {calendar}
                </Typography>
                <Typography variant="body1" sx={typographyStyle}>
                    <PaidIcon sx={iconStyle} fontSize="small" />
                    Gi?? kh??m: {props.price.toLocaleString("en-US")} VND
                </Typography>
            </CardActionArea>
        </Card>
    );
}
