import {
    Card,
    CardActionArea,
    Paper,
    Typography,
    Grid,
    Box,
    Slide,
    SwipeableDrawer,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

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
    marginRight: 2,
};

const status = [
    { color: "#ab47bc", message: "Đợi xác nhận" },
    { color: "teal", message: "Đã xác nhận" },
    { color: "green", message: "Đã khám" },
    { color: "red", message: "Đã muộn" },
];
// item
//      id
//      status

interface OrderCardProps {
    item;
    onOpenDetail;
    attachments;
}

export default function OrderCard(props: OrderCardProps) {
    const openDetail = () => {
        const id = props.item.id;
        props.onOpenDetail(id);
    };
    return (
        <Card sx={cardStyle} elevation={2}>
            <Box sx={{ padding: 3 }}>
                {/* <CardActionArea sx={{ padding: 3 }}> */}
                <Box sx={{ display: "flex" }}>
                    <Typography
                        component="div"
                        color="primary"
                        sx={{
                            fontSize: 20,
                            fontWeight: "bold",
                            flex: 1,
                            ...typographyStyle,
                        }}
                    >
                        <AssessmentIcon
                            sx={{ marginLeft: -0.2, ...iconStyle }}
                        />
                        Đơn số #{props.item.id}
                        <IconButton
                            sx={{ marginLeft: 1, marginBottom: 0.2 }}
                            onClick={() => openDetail()}
                        >
                            <InfoIcon
                                sx={{ fontSize: 18, color: "GrayText" }}
                            />
                        </IconButton>
                    </Typography>

                    <Typography sx={{ ...typographyStyle }}>
                        <Typography
                            sx={{
                                align: "right",
                                fontSize: 25,
                                marginTop: -0.3,
                                marginRight: 1,
                            }}
                            color={status[props.item.status].color}
                        >
                            ●
                        </Typography>
                        <Typography
                            sx={{ align: "right", marginRight: 2 }}
                            color={status[props.item.status].color}
                            variant="subtitle1"
                        >
                            {status[props.item.status].message}
                        </Typography>
                    </Typography>
                </Box>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold" }}
                        >
                            Thông tin chung
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography>
                                    Bác sĩ:
                                </Typography>
                                {props.item.doctor}
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    Thời gian:
                                </Typography>
                                {props.item.time}
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    Địa điểm:
                                </Typography>
                                {props.item.address}
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    Ghi chú của bác sĩ:
                                </Typography>
                                {props.item.note}
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold" }}
                        >
                            Đính kèm
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {props.attachments.map((attachment) => (
                            <Typography>
                                <Link href={attachment.href}>
                                    {attachment.name}
                                </Link>
                            </Typography>
                        ))}
                    </AccordionDetails>
                </Accordion>
                {/* </CardActionArea> */}
            </Box>
        </Card>
    );
}
