import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../../components/patient/Navigator";
import ChooseDoctorContent from "../../components/patient/ChooseDoctorContent";
import Header from "../../components/Header";
import { getTheme, Copyright } from "../../utils/theme/ThemeProvider";
import ChooseDateContent from "../../components/patient/ChooseDateContent";
import DescriptionContent from "../../components/patient/DescriptionContent";
import PatientNavigator from "../../components/patient/Navigator";
import OrderDetailContent from "../../components/patient/OrderDetailContent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../utils/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthService } from "../../service/AuthService";
import Order from "../../interface/order";
import { OrderService } from "../../service/OrderService";
import SuccessContent from "../../components/patient/SuccessContent";

let theme = getTheme("default");
const drawerWidth = 256;
const tabs = ["Bác sĩ", "Ngày giờ", "Mô tả", "Thanh toán"];
const content = [
    <Box key="choose-doctor-content" />,
    <Box key="choose-date-content" />,
    <Box key="description-content" />,
    <Box key="order-detail-content" />,
];

export default function Paperbase() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const [currentTabId, setCurrentTabId] = useState(0);
    const [currentTab, setCurrentTab] = useState<JSX.Element>(<Box />);
    const [currentOrder, setCurrentOrder] = useState<any>({});
    const { accessToken, role, userId } = useAuth();
    const router = useRouter();
    const { validateToken } = AuthService();
    const { createOrder, getOrders } = OrderService();

    const setDoctor = (doctorId, calendar, price, doctor?) => {
        setCurrentOrder((order) => ({
            ...order,
            doctorId: doctorId,
            calendar: calendar,
            price: price,
            location: doctor?.hospital?.name,
            doctor: doctor,
            status: 0,
        }));
    };

    const setCalendar = (date, shift) => {
        setCurrentOrder((order) => ({
            ...order,
            date: date,
            shift: shift,
        }));
    };

    const setDescription = (des) => {
        setCurrentOrder((order) => ({
            ...order,
            description: des,
        }));
    };

    const validate = async () => {
        let jwtValid = await validateToken(accessToken);
        if (!jwtValid)
            router.push({
                pathname: "/login",
                query: { warning: "Session expired!" },
            });
    };

    const handleNextTab = () => {
        setCurrentTabId(currentTabId + 1);
    };
    const handlePreviousTab = () => {
        setCurrentTabId(currentTabId - 1);
    };

    // useEffect(() => {
    //     setCurrentTab(content[currentTabId]);
    // }, [currentTabId]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSubmit = async () => {
        let temp = { ...currentOrder };
        let r = await createOrder(temp, accessToken);
        console.log(r);
        if (r.status == 201) {
            toast.success("Tạo yêu cầu thành công");
            setCurrentTabId(currentTabId + 1);
        } else {
            toast.warning("Yêu cầu chưa được tạo");
        }
    };

    useEffect(() => {
        setCurrentOrder((order) => ({
            ...order,
            patientId: userId,
        }));
    }, [userId]);

    useEffect(() => {
        if (!accessToken)
            router.push({
                pathname: "/login",
                query: { unauthorized: 1 },
            });
        if (role != 1) router.push("/gateway");
        validate();
    }, [accessToken]);

    // useEffect(() => {
    //     console.log("Current Order");
    //     console.log(currentOrder);
    // }, [currentOrder]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {isSmUp ? null : (
                        <PatientNavigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            choosing="create-order"
                        />
                    )}
                    <PatientNavigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        choosing="create-order"
                        sx={{ display: { sm: "block", xs: "none" } }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        title="create-order"
                        choosing={currentTabId}
                        tabs={tabs}
                        onChangeTab={() => {}}
                    />
                    <Box
                        component="main"
                        sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
                    >
                        <>
                            {currentTabId == 0 && (
                                <ChooseDoctorContent
                                    key="choose-doctor-content"
                                    onNextTab={handleNextTab}
                                    setDoctor={setDoctor}
                                />
                            )}
                            {currentTabId == 1 && (
                                <ChooseDateContent
                                    setCalendar={setCalendar}
                                    calendar={currentOrder.calendar}
                                    key="choose-date-content"
                                    onNextTab={handleNextTab}
                                    onPreviousTab={handlePreviousTab}
                                />
                            )}
                            {currentTabId == 2 && (
                                <DescriptionContent
                                    setDescription={setDescription}
                                    key="description-content"
                                    onNextTab={handleNextTab}
                                    onPreviousTab={handlePreviousTab}
                                />
                            )}
                            {currentTabId == 3 && (
                                <OrderDetailContent
                                    order={currentOrder}
                                    onSubmit={handleSubmit}
                                    onPreviousTab={handlePreviousTab}
                                />
                            )}
                            {currentTabId == 4 && <SuccessContent />}
                        </>
                    </Box>
                    <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
                        <Copyright />
                    </Box>
                </Box>
                <ToastContainer />
            </Box>
        </ThemeProvider>
    );
}
