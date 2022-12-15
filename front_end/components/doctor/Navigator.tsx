import * as React from "react";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import Navigator from "../Navigator";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

interface DoctorNavigatorProps {
    choosing;
    PaperProps?;
    variant?;
    open?;
    onClose?;
    sx?;
}

export default function DoctorNavigator(props: DoctorNavigatorProps) {
    const categories = [
        {
            id: "CÔNG CỤ",
            children: [
                // {
                //     id: "create-order",
                //     text: "Tạo yêu cầu khám bệnh",
                //     icon: <AddIcon />,
                //     active: false,
                //     route: "/patient/createOrder",
                // },
                {
                    id: "doctor-orders",
                    text: "Quản lý yêu cầu",
                    icon: <DnsRoundedIcon />,
                    route: "/doctor/orders",
                },
                {
                    id: "doctor-calendar",
                    text: "Thiết lập xử lý yêu cầu",
                    icon: <SettingsIcon />,
                    route: "/doctor/calendar",
                },
                {
                    id: "doctor-attachments",
                    text: "Đính kèm",
                    icon: <AttachFileIcon />,
                    route: "/doctor/attachments",
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
                    route: "/account/profile",
                },
                {
                    id: "update-profile",
                    text: "Cập nhật thông tin cá nhân",
                    icon: <EditIcon />,
                    route: "/account/editprofile",
                },
                {
                    id: "log-out",
                    text: "Đăng xuất",
                    icon: <LogoutIcon />,
                    route: "/logout",
                },
            ],
        },
    ];

    return (
        <Navigator
            PaperProps={props.PaperProps}
            choosing={props.choosing}
            home="/admin/home"
            categories={categories}
            sx={props?.sx}
        />
    );
}
