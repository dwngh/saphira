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

const lightColor = "rgba(255, 255, 255, 0.7)";

interface HeaderProps {
    onDrawerToggle: () => void;
}

const headerTitle = {
    home: "Trang chủ",
    "create-order": "Tạo yêu cầu khám bệnh",
    "my-orders": "Quản lý yêu cầu",
    attachment: "Tệp đính kèm",
    profile: "Tài khoản của tôi",
    "update-profile": "Cập nhật thông tin cá nhân",
};

export default function Header(props) {
    const { onDrawerToggle } = props.onDrawerToggle;

    return (
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
                            <IconButton color="inherit" sx={{ p: 0.5 }}>
                                <Avatar
                                    src="/static/images/avatar/1.jpg"
                                    alt="My Avatar"
                                />
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
        </React.Fragment>
    );
}
