import * as React from "react";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import Navigator from "../Navigator";

export default function PatientNavigator({ choosing, PaperProps }) {
    const categories = [
        {
            id: "CÔNG CỤ",
            children: [
                {
                    id: "create-order",
                    text: "Tạo yêu cầu khám bệnh",
                    icon: <AddIcon />,
                    active: false,
                    route: "/patient/createOrder",
                },
                {
                    id: "my-orders",
                    text: "Quản lý yêu cầu",
                    icon: <DnsRoundedIcon />,
                    route: "/patient/orders",
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
                {
                    id: "log-out",
                    text: "Đăng xuất",
                    icon: <EditIcon />,
                },
            ],
        },
    ];

    return (
        <Navigator
            PaperProps={PaperProps}
            choosing={choosing}
            home="/patient/home"
            categories={categories}
        />
    );
}
