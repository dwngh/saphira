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
import AdminNavigator from "../../components/admin/Navigator";
import { AuthService } from "../../service/AuthService";

let theme = getTheme("default");
const drawerWidth = 256;

export default function Paperbase() {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const [currentTabId, setCurrentTabId] = React.useState(0);
    const { username, name, accessToken, role } = useAuth();
    const { validateToken } = AuthService();

    const validate = async() => {
        let jwtValid = await validateToken(accessToken);
        if (!jwtValid) router.push({
            pathname: "/login",
            query: { warning: "Session expired!" },
        });
    }
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
        if (role != 0) router.push("/gateway");
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
                        <AdminNavigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            choosing="home"
                            onClose={handleDrawerToggle}
                        />
                    )}
                    <AdminNavigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        choosing="home"
                        sx={{ display: { sm: "block", xs: "none" } }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        title="home"
                        choosing={currentTabId}
                        tabs={[]}
                        onChangeTab={handleChangeTab}
                    />
                    <Box
                        component="main"
                        sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
                    >
                        <Paper
                            sx={{
                                maxWidth: 936,
                                margin: "auto",
                                overflow: "hidden",
                                height: 450,
                                padding: 5,
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="div"
                                color="default"
                            >
                                Chào mừng bạn đã quay trở lại! 
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                color="Highlight"
                            >
                                Admin: {name}
                            </Typography>
                            <Typography variant="body1" component="div">
                                Sử dụng các chức năng bên trái thanh công cụ để
                                thao tác.
                            </Typography>
                        </Paper>
                    </Box>
                    <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
                        <Copyright />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
