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
import { useAuth } from "../utils/useAuth";
import { Box, Card, Paper } from "@mui/material";
import SpAvatar from "./user/Avatar";
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
    "home": "Trang chủ",
    "create-order": "Tạo yêu cầu khám bệnh",
    "my-orders": "Quản lý yêu cầu",
    "attachment": "Tệp đính kèm",
    "profile": "Tài khoản của tôi",
    "update-profile": "Cập nhật thông tin cá nhân",
    "admin-accounts": "Quản lý tài khoản",
    "admin-hospital": "Quản lý bệnh viện",
};

export default function Header(props: HeaderProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openChangePass, setOpenChangePass] = React.useState(false);
    const openProfile = Boolean(anchorEl);
    const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseProfile = () => {
        setAnchorEl(null);
    };
    const openDialogChangePass = () => {
        setOpenChangePass(true)
    }
    const { onDrawerToggle } = props.onDrawerToggle;
    const { username, name } = useAuth();
    return (
        <>
        {openChangePass === false ? <></> : <ChangePass/>}
        <React.Fragment>
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
                        <Grid item>
                            <Link
                                href="/"
                                variant="body2"
                                sx={{
                                    textDecoration: "none",
                                    color: lightColor,
                                    "&:hover": {
                                        color: "common.white",
                                    },
                                }}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Go to docs
                            </Link>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Alerts • No alerts">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={handleClickProfile}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={
                                    openProfile ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={openProfile ? "true" : undefined}
                            >
                                <SpAvatar name={name}/>
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
                        <Grid item>
                            <Button
                                sx={{ borderColor: lightColor }}
                                variant="outlined"
                                color="inherit"
                                size="small"
                            >
                                Web setup
                            </Button>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Help">
                                <IconButton color="inherit">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
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
                PaperProps={{
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
                }}
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
                        sx={{ minHeight: "30", paddingTop: 3, paddingBottom: 3}}
                    >
                        <Grid item xs={3}>
                            <SpAvatar name={name} width={100}/>
                        </Grid>
                    </Grid>
                </Box>
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={openDialogChangePass}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
        </>
    );
}
