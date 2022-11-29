import { AppBar, Button, Paper, SwipeableDrawer, Typography } from "@mui/material";
import { Fragment } from "react";
import ShiftList from "../../time/ShiftList";
import Box from "@mui/material/Box";
import DescriptionCard from "./DescriptionCard";
import OrderDetailCard from "./OrderDetailCard";
import useWindowDimensions from "../../../utils/useWindowDimensions";

interface SwipeableOrderDetailProps {
    open: boolean;
    setOpen: (open) => void;
    order;
}

export default function SwipeableOrderDetail(props: SwipeableOrderDetailProps) {
    const { height, width } = useWindowDimensions();
    return (
        <Fragment>
            <SwipeableDrawer
                anchor="right"
                open={props.open}
                onOpen={() => props.setOpen(true)}
                onClose={() => props.setOpen(false)}
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
                        <Typography variant="subtitle2" sx={{ marginLeft: 1 }}>
                            Vì một số lí do, sau khi tạo yêu cầu người dùng sẽ
                            chỉ được chỉnh sửa ca khám và mô tả thêm của yêu
                            cầu.
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
                        isCreated={true}
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
    );
}
