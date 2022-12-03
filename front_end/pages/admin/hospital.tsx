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
import AdminNavigator from "../../components/admin/Navigator";
import AccountListContent from "../../components/admin/AccountListContent";
import HospitalManagementContent from "../../components/admin/HospitalManagementContent";

let theme = getTheme("default");
const drawerWidth = 256;
const tabs = ["Danh sách" ];
const content = [
    <HospitalManagementContent key="hospital-management"/>,
];

export default function Paperbase() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const [currentTabId, setCurrentTabId] = React.useState(0);
    const [currentTab, setCurrentTab] = React.useState<JSX.Element>(<Box />);

    React.useEffect(() => {
        setCurrentTab(content[currentTabId]);
    }, [currentTabId]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleChangeTab = (e) => {
        let id = e.currentTarget.id;
        setCurrentTabId(+id);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {isSmUp ? null : (
                        <AdminNavigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            choosing="admin-hospital"
                        />
                    )}
                    <AdminNavigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        choosing="admin-hospital"
                        sx={{ display: { sm: "block", xs: "none" } }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        title="admin-hospital"
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
