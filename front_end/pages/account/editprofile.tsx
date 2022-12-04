import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../../components/Navigator";
import ChooseDoctorContent from "../../components/patient/ChooseDoctorContent";
import Header from "../../components/Header";
import { getTheme, Copyright } from "../../utils/theme/ThemeProvider";
import ChooseDateContent from "../../components/patient/ChooseDateContent";
import DescriptionContent from "../../components/patient/DescriptionContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../utils/useAuth";
import PatientNavigator from "../../components/patient/Navigator";
import AttachmentContent from "../../components/patient/AttachmentContent";
import ProfileContent from "../../components/ProfileContent";
import EditProfileContent from "../../components/EditProfileContent";
import AdminNavigator from "../../components/admin/Navigator";

let theme = getTheme("default");
const drawerWidth = 256;

export default function Paperbase() {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const [currentTabId, setCurrentTabId] = React.useState(0);
    const [currentTab, setCurrentTab] = React.useState<JSX.Element>();
    const { accessToken, userId, role } = useAuth();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleChangeTab = (e) => {
        let id = e.currentTarget.id;
        setCurrentTabId(+id);
    };

    useEffect(() => {
        setCurrentTab(<EditProfileContent userId={userId} />)
    }, [])

    useEffect(() => {
        if (!accessToken)
            router.push({
                pathname: "/login",
                query: { unauthorized: 1 },
            });
    }, [accessToken]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                                        {role == 1 && (<>
                        {isSmUp ? null : (
                            <PatientNavigator
                                PaperProps={{ style: { width: drawerWidth } }}
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                choosing="profile"
                            />
                        )}
                        <PatientNavigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            choosing="profile"
                            sx={{ display: { sm: "block", xs: "none" } }}
                        />
                    </>)}
                    {role == 0 && (<>
                        {isSmUp ? null : (
                            <AdminNavigator
                                PaperProps={{ style: { width: drawerWidth } }}
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                choosing="profile"
                            />
                        )}
                        <AdminNavigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            choosing="profile"
                            sx={{ display: { sm: "block", xs: "none" } }}
                        />
                    </>)}
                </Box>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        title="update-profile"
                        choosing={currentTabId}
                        tabs={[]}
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
