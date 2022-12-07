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
import CalendarContent from "../../components/doctor/CalendarContent";
import AutoNoteContent from "../../components/doctor/AutoNoteContent";
import { UserService } from "../../service/UserService";
import CalendarService from "../../service/CalendarService";

let theme = getTheme("default");
const drawerWidth = 256;
const tabs = ["Thiết lập thời gian", "Thiết lập ghi chú"];
const content = [
    <CalendarContent key="doctor-calendar" />,
    <AutoNoteContent key="doctor-note" />,
];

export default function Paperbase() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const [currentTabId, setCurrentTabId] = React.useState(0);
    const [currentTab, setCurrentTab] = React.useState<JSX.Element>(<Box />);
    const [content, setContent] = React.useState([
        <CalendarContent key="doctor-calendar" />,
        <AutoNoteContent key="doctor-note" />,
    ]);
    const { accessToken, role, userId } = useAuth();
    const router = useRouter();
    const { validateToken } = AuthService();
    const { getUser, updateUser } = UserService();
    const { createCalendar } = CalendarService();
    const [currentCalendar, setCurrentCalendar] = React.useState<any>({});

    const validate = async () => {
        let jwtValid = await validateToken(accessToken);
        if (!jwtValid)
            router.push({
                pathname: "/login",
                query: { warning: "Session expired!" },
            });
    };

    const fetchData = async () => {
        console.log("Fetching data ...");
        const user: any = await getUser(userId, accessToken);
        console.log(user);
        if (!user.calendarId) {
            console.log("Creating calendar");
            let r = await createCalendar(user, accessToken);
            console.log(r);
            setCurrentCalendar(r);
        } else {
            setCurrentCalendar(user.calendar);
        }
    };

    useEffect(() => {
        setCurrentTab(content[currentTabId]);
    }, [currentTabId]);

    useEffect(() => {
        fetchData();
    }, []);
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
                            choosing="doctor-calendar"
                        />
                    )}
                    <DoctorNavigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        choosing="doctor-calendar"
                        sx={{ display: { sm: "block", xs: "none" } }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        title="admin-accounts"
                        choosing={currentTabId}
                        tabs={tabs}
                        onChangeTab={handleChangeTab}
                    />
                    <Box
                        component="main"
                        sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
                    >
                        {currentTabId == 0 ? (
                            <CalendarContent
                                key="doctor-calendar"
                                calendar={currentCalendar}
                                onSaveData={fetchData}
                            />
                        ) : (
                            <AutoNoteContent key="doctor-note" 
                                calendar={currentCalendar}
                                onSaveData={fetchData}
                            />
                        )}
                    </Box>
                    <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
                        <Copyright />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
