import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import MedicationLiquidTwoToneIcon from "@mui/icons-material/MedicationLiquidTwoTone";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";

const categories = [
    {
        id: "CÔNG CỤ",
        children: [
            {
                id: "create-order",
                text: "Tạo yêu cầu khám bệnh",
                icon: <AddIcon />,
                active: false,
            },
            {
                id: "my-orders",
                text: "Quản lý yêu cầu",
                icon: <DnsRoundedIcon />,
            },
            {
                id: "attachment",
                text: "Tệp đính kèm",
                icon: <AttachFileIcon />,
            },
        ],
    },
    {
        id: "TÀI KHOẢN",
        children: [
            {
                id: "profile",
                text: "Tài khoản của tôi",
                icon: <AccountCircleIcon />,
            },
            {
                id: "update-profile",
                text: "Cập nhật thông tin cá nhân",
                icon: <EditIcon />,
            },
        ],
    },
];

const item = {
    py: "12px",
    px: 3,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover, &:focus": {
        bgcolor: "rgba(255, 255, 255, 0.08)",
    },
};

const itemCategory = {
    boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const { ...other } = props.PaperProps;
    React.useEffect(() => {
        categories.forEach(category => {
            category.children.forEach(item => {
                if (item.id == props.choosing) item.active = true;
                else item.active = false;
            })
        })
    }, [])

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem
                    sx={{
                        ...item,
                        ...itemCategory,
                        fontSize: 22,
                        color: "#fff",
                        fontFamily: "fantasy",
                    }}
                >
                    <MedicationLiquidTwoToneIcon fontSize="large" />
                    &nbsp;&nbsp;Saphira
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: "#101F33" }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: "#fff", fontWeight: 500 }}>
                                <b>{id}</b>
                            </ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, text, icon, active }) => (
                            <ListItem disablePadding key={childId}>
                                <ListItemButton selected={active} sx={item}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{text}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}
