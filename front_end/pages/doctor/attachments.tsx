import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { getTheme, Copyright } from "../../utils/theme/ThemeProvider";
import { useAuth } from "../../utils/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthService } from "../../service/AuthService";
import OrderManagementContent from "../../components/doctor/OrderManagementContent";
import DoctorNavigator from "../../components/doctor/Navigator";
import AttachmentContent from "../../components/doctor/AttachmentContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let theme = getTheme("default");
const drawerWidth = 256;
const tabs = ["Đính kèm"];
const content = [
    <AttachmentContent key="doctor-order"/>,
    // <EditProfileContent registering privilege key="choose-date-content"/>,
];



export default function Paperbase() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const [currentTabId, setCurrentTabId] = React.useState(0);
    const [currentTab, setCurrentTab] = React.useState<JSX.Element>(<Box />);
    const { accessToken, role } = useAuth();
    const router = useRouter();
    const { validateToken } = AuthService();

    const validate = async() => {
        let jwtValid = await validateToken(accessToken);
        if (!jwtValid) router.push({
            pathname: "/login",
            query: { warning: "Session expired!" },
        });
    }

    useEffect(() => {
        setCurrentTab(content[currentTabId]);
    }, [currentTabId]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleChangeTab = (e) => {
        let id = e.currentTarget.id;
        setCurrentTabId(+id);
    };

    useEffect(() => {
        if (!accessToken)
            router.push({
                pathname: "/login",
                query: { unauthorized: 1 },
            });
        if (role != 3) router.push("/gateway");
        validate();
    }, [accessToken]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {isSmUp ? null : (
                        <DoctorNavigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            choosing="doctor-attachments"
                        />
                    )}
                    <DoctorNavigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        choosing="doctor-attachments"
                        sx={{ display: { sm: "block", xs: "none" } }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        title="attachment"
                        choosing={currentTabId}
                        tabs={tabs}
                        onChangeTab={handleChangeTab}
                    />
                    <Box
                        component="main"
                        sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
                    >
                        {currentTab}
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
