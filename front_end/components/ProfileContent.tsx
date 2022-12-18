import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { useAuth } from "../utils/useAuth";
import { UserService } from "../service/UserService";
import dayjs from "dayjs";

interface ProfileContentProps {
    userId;
}

const Roles = ["Admin", "Bệnh nhân", "Thư ký", "Bác sĩ"];

const Blood_Types = ["A", "B", "AB", "O"];

export default function ProfileContent(props: ProfileContentProps) {
    const { accessToken, userId } = useAuth();
    const { getUser } = UserService();
    const [data, dataSet] = useState<any>({
        address: "",
        anamnesis: "",
        birthday: dayjs("2014-08-18"),
        blood_type: "",
        email: "",
        gender: 0,
        height: "",
        hi_num: "",
        id: 0,
        identity_num: "",
        name: "",
        password: "",
        phone: "",
        price: "",
        role: "",
        username: "",
        weight: "",
    });

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await getUser(props.userId, accessToken);
            dataSet(response);
        }
        fetchMyAPI();
    }, []);

    return (
        <Paper
            sx={{
                maxWidth: 950,
                margin: "auto",
                overflow: "auto",
                height: 500,
                padding: 4,
            }}
        >
            <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: "bold", marginBottom: 4 }}
            >
                THÔNG TIN TÀI KHOẢN
            </Typography>
            <Divider>
                <Typography variant="caption" color="#9e9e9e">
                    Thông tin định danh
                </Typography>
            </Divider>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Họ và tên:
                    </Typography>
                    {data.name}
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Ngày sinh:
                    </Typography>
                    {`${dayjs(data.birthday).get("date")}-${
                        dayjs(data.birthday).get("month") + 1
                    }-${dayjs(data.birthday).get("year")}`}
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Giới tính:
                    </Typography>
                    {data.gender === true ? "Nam" : "Nữ"}
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>CCCD:</Typography>
                    {data.identity_num}
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Địa chỉ:
                    </Typography>
                    {data.address}
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Điện thoại:
                    </Typography>
                    {data.phone}
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>Email:</Typography>
                    {data.email}
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Vai trò:
                    </Typography>
                    {Roles[data.role]}
                </Grid>
            </Grid>
            {data.role == 1 && (
                <>
                    <Divider>
                        <Typography variant="caption" color="#9e9e9e">
                            Thông tin bệnh nhân
                        </Typography>
                    </Divider>
                    <Grid container spacing={2} sx={{ padding: 2 }}>
                        <Grid item xs={3}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Số BHYT:
                            </Typography>
                            {data.hi_num}
                        </Grid>
                        <Grid item xs={3}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Chiều cao:
                            </Typography>
                            {`${data.height} cm`}
                        </Grid>
                        <Grid item xs={3}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Cân nặng:
                            </Typography>
                            {`${data.weight} kg`}
                        </Grid>
                        <Grid item xs={3}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Nhóm máu:
                            </Typography>
                            {Blood_Types[data.blood_type]}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Tiểu sử bệnh:
                            </Typography>
                            <TextField
                                id="outlined-multiline-static"
                                label="Tiểu sử bệnh"
                                value={data.anamnesis}
                                multiline
                                rows={7}
                                sx={{ marginTop: 3 }}
                                fullWidth={true}
                                disabled
                            />
                        </Grid>
                    </Grid>
                </>
            )}
        {data.role == 3 && (
            <>
            <Divider>
                        <Typography variant="caption" color="#9e9e9e">
                            Thông tin bác sĩ
                        </Typography>
                    </Divider>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                                Bệnh viện
                            </Typography>
                            {data?.hospital?.name}
                        </Grid>
                        <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                                Chuyên ngành
                            </Typography>
                            {data?.speciality?.name}
                        </Grid>
                        <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                                Giá tiền
                            </Typography>
                            {data?.price?.toLocaleString("en-US")} VNĐ
                        </Grid>
                    </Grid></>
        )}
        </Paper>
    );
}
