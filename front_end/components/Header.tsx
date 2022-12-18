import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import Head from "next/head";
import { useAuth } from "../utils/useAuth";
import { Badge, Box, Card, Fade, Paper, Popper } from "@mui/material";
import SpAvatar from "./user/Avatar";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Notifications from "./user/Notification";
import NotificationService from "../service/NotificationService";
import { useEffect } from "react";
import ChangePass from "./user/ChangePass";
const lightColor = "rgba(255, 255, 255, 0.7)";

interface HeaderProps {
    onDrawerToggle;
    title;
    choosing;
    tabs;
    onChangeTab: (e) => void;
}

const headerTitle = {
    home: "Trang chủ",
    "create-order": "Tạo yêu cầu khám bệnh",
    "my-orders": "Quản lý yêu cầu",
    attachment: "Tệp đính kèm",
    profile: "Tài khoản của tôi",
    "update-profile": "Cập nhật thông tin cá nhân",
    "admin-accounts": "Quản lý tài khoản",
    "admin-hospital": "Quản lý bệnh viện",
    "doctor-calendar": "Cài đặt lịch khám",
    "doctor-orders": "Quản lý yêu cầu",
};

const menuPaperProps = {
    elevation: 0,
    sx: {
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: 1.5,
        "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
        },
    },
};

export default function Header(props: HeaderProps) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openChangePass, setOpenChangePass] = React.useState(false);
    const openProfile = Boolean(anchorEl);
    const [anchorNoti, setAnchorNoti] = React.useState<null | HTMLElement>(
        null
    );
    const [openNotification, setOpenNotification] = React.useState(false);
    const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseProfile = () => {
        setAnchorEl(null);
    };
    const handleClickNotification = (event: React.MouseEvent<HTMLElement>) => {
        if (openNotification) {
            setAnchorNoti(null);
            setOpenNotification(false);
        } else {
            setAnchorNoti(event.currentTarget);
            setOpenNotification(true);
        }
    };

    const { getNotifications, markRead, markAllRead } = NotificationService();
    const [notifications, setNotifications] = React.useState<any[]>([]);
    const openDialogChangePass = () => {
        setOpenChangePass(true);
    };
    const CloseChangePass = () => {
        setOpenChangePass(false);
    };
    const { onDrawerToggle } = props.onDrawerToggle;
    const { accessToken, name, userId } = useAuth();
    const [unread, setUnread] = React.useState(0);

    const handleMarkRead = async (id) => {
        console.log("Handle mark read");
        await markRead(id, accessToken);
        await fetchData();
    };

    const handleMarkAllRead = async (id) => {
        await markAllRead(userId, accessToken);
        await fetchData();
    };

    const fetchData = async () => {
        let notis = await getNotifications(userId, accessToken);
        console.log(notis);
        setNotifications(notis.reverse());
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let len = notifications.filter((item) => !item.read).length;
        setUnread(len);
    }, [notifications]);

    return (
        <>
            {openChangePass === false ? (
                <></>
            ) : (
                <ChangePass changePass={CloseChangePass} />
            )}
            <React.Fragment>
                <Head>
                    <title>{headerTitle[props.title]}</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>
                <AppBar color="primary" position="sticky" elevation={0}>
                    <Toolbar>
                        <Grid container spacing={1} alignItems="center">
                            <Grid
                                sx={{ display: { sm: "none", xs: "block" } }}
                                item
                            >
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={onDrawerToggle}
                                    edge="start"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs />
                            <Grid item></Grid>
                            <Grid item>
                                <Tooltip title="Thông báo">
                                    <IconButton
                                        color="inherit"
                                        onClick={handleClickNotification}
                                    >
                                        <Badge
                                            color="error"
                                            badgeContent={unread}
                                        >
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    onClick={handleClickProfile}
                                    sx={{ ml: 2 }}
                                    aria-controls={
                                        openProfile ? "account-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={
                                        openProfile ? "true" : undefined
                                    }
                                >
                                    <SpAvatar name={name} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <AppBar
                    component="div"
                    color="primary"
                    position="static"
                    elevation={0}
                    sx={{ zIndex: 0 }}
                >
                    <Toolbar>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs>
                                <Typography
                                    color="inherit"
                                    variant="h5"
                                    component="h1"
                                >
                                    {headerTitle[props.title]}
                                </Typography>
                            </Grid>
                            <Grid item></Grid>
                            <Grid item></Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <AppBar
                    component="div"
                    position="static"
                    elevation={0}
                    sx={{ zIndex: 0 }}
                >
                    {props.tabs.length > 0 && (
                        <Tabs value={props.choosing ?? 0} textColor="inherit">
                            {props.tabs.map((value, index) => (
                                <Tab
                                    id={"" + index}
                                    key={"tab-" + index}
                                    label={value}
                                    onClick={props.onChangeTab}
                                />
                            ))}

                            {/* <Tab label="Sign-in method" />
                    <Tab label="Templates" />
                    <Tab label="Usage" /> */}
                        </Tabs>
                    )}
                </AppBar>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openProfile}
                    onClose={handleCloseProfile}
                    onClick={handleCloseProfile}
                    PaperProps={menuPaperProps}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <Box>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                minHeight: "30",
                                paddingTop: 3,
                                paddingBottom: 3,
                            }}
                        >
                            <Grid item xs={2}>
                                <SpAvatar name={name} width={100} />
                            </Grid>
                            <Grid item xs={3}>
                                <table>
                                    <tr>
                                        <td>
                                            <Typography variant="caption">
                                                UID:
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="caption">
                                                {userId}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="caption">
                                                Name:
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="caption">
                                                {name}
                                            </Typography>
                                        </td>
                                    </tr>
                                </table>
                            </Grid>
                        </Grid>
                    </Box>
                    <MenuItem
                        onClick={() => router.push("/account/profile")}
                        sx={{ minWidth: 170 }}
                    >
                        Hồ sơ của tôi
                    </MenuItem>
                    <MenuItem onClick={openDialogChangePass}>
                        Đổi mật khẩu
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => router.push("/logout")}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
                <Notifications
                    anchor={anchorNoti}
                    open={openNotification}
                    notifications={notifications}
                    onMarkRead={handleMarkRead}
                    onMarkAllRead={handleMarkAllRead}
                />
            </React.Fragment>
        </>
    );
}
