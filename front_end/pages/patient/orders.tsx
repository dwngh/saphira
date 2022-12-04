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
import MyDoctorContent from "../../components/patient/MyOrderContent";
import { useAuth } from "../../utils/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

let theme = getTheme("default");
const drawerWidth = 256;
const tabs = ["Yêu cầu của tôi"];
const content = [
    <MyDoctorContent key="my-doctor-content"/>,
];

export default function Paperbase() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const [currentTabId, setCurrentTabId] = React.useState(0);
    const [currentTab, setCurrentTab] = React.useState<JSX.Element>(<Box />);
    const { accessToken, role } = useAuth();
    const router = useRouter();

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
        if (role != 1) router.push("/gateway");
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
                        <PatientNavigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            choosing="my-orders"
                        />
                    )}
                    <PatientNavigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        choosing="my-orders"
                        sx={{ display: { sm: "block", xs: "none" } }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        title="my-orders"
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
            </Box>
        </ThemeProvider>
    );
}
