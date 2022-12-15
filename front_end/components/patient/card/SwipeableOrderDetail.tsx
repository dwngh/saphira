import {
    AppBar,
    Button,
    Paper,
    SwipeableDrawer,
    Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ShiftList from "../../time/ShiftList";
import Box from "@mui/material/Box";
import DescriptionCard from "./DescriptionCard";
import OrderDetailCard from "./OrderDetailCard";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { TimeSolve } from "../../../common/time";
import dayjs from "dayjs";
import { OrderService } from "../../../service/OrderService";
import { useAuth } from "../../../utils/useAuth";
import { toast } from "react-toastify";

interface SwipeableOrderDetailProps {
    open: boolean;
    setOpen: (open) => void;
    order;
}

export default function SwipeableOrderDetail(props: SwipeableOrderDetailProps) {
    const [choosedShift, setChoosedShift] = useState<number>();
    const [avail, setAvail] = useState("00000000");
    const [enableEditShift, setEnableEditShift] = useState(false);
    const [description, setDescription] = useState("");
    const { height, width } = useWindowDimensions();
    const { isEmpty, getShiftAvailable } = TimeSolve();
    const { updateOrder } = OrderService();
    const { accessToken } = useAuth();

    useEffect(() => {
        setChoosedShift(props.order?.shift);
        setDescription(props.order?.description);
        let date = dayjs(props.order?.date).day();
        // console.log(dayjs(props.order?.date).format("DD-MM-YYYY"));
        if (isEmpty(props.order?.doctor?.calendar?.avail)) setAvail("11111111");
        else if (date == 0) {
            setAvail(
                getShiftAvailable(props.order?.doctor?.calendar?.avail, 6)
            );
        } else if (date > 0 && date <= 6) {
            setAvail(
                getShiftAvailable(
                    props.order?.doctor?.calendar?.avail,
                    date - 1
                )
            );
        }
    }, [props.order]);

    const handleShiftChoose = (e) => {
        let id = +e.currentTarget.id;
        setChoosedShift(id);
    };

    const handleShiftSave = async() => {
        const temp = {
            id: props.order?.id,
            shift: choosedShift
        };
        let result = await updateOrder(temp, accessToken);
        if (result?.status == 201 || result?.affected == 1) {
            toast.success("Cập nhật thành công");
        } else {
            toast.warning("Cập nhật chưa thành công");
            setChoosedShift(props.order?.shift)
        }
        setEnableEditShift(false);
    } 

    const handleDescriptionSave = async(des) => {
        const temp = {
            id: props.order?.id,
            description: des,
        };
        let result = await updateOrder(temp, accessToken);
        if (result?.status == 201 || result?.affected == 1) {
            toast.success("Cập nhật thành công");
            setDescription(des);
        } else {
            toast.warning("Cập nhật chưa thành công");
            setDescription(props.order?.description);
        }
    }

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
                            name: props.order?.patient?.name,
                            email: props.order?.patient?.email,
                            birthday: props.order?.patient?.birthday,
                            phone: props.order?.patient?.phone,
                        }}
                        doctor={{
                            name: props.order?.doctor?.name,
                            speciality: props.order?.doctor?.speciality?.name,
                            shift: props.order?.shift,
                            date: props.order?.date,
                            location: props.order?.location,
                        }}
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
                            choosedShift={choosedShift}
                            onChooseShift={handleShiftChoose}
                            enable={enableEditShift}
                            avail={avail}
                            small
                        />
                        <Box
                            m={2}
                            //margin
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                        >
                            {enableEditShift ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ height: 40, borderRadius: 28 }}
                                    onClick={handleShiftSave}
                                >
                                    Lưu
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ height: 40, borderRadius: 28 }}
                                    onClick={() => setEnableEditShift(true)}
                                >
                                    Chỉnh sửa
                                </Button>
                            )}
                        </Box>
                    </Paper>
                    <Paper sx={{ margin: 2, padding: 3 }} elevation={3}>
                        <DescriptionCard
                            isCompleted={true}
                            description={description}
                            setDescription={handleDescriptionSave}
                        />
                    </Paper>
                </Paper>
            </SwipeableDrawer>
        </Fragment>
    );
}
