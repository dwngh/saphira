import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

interface ProfileContentProps {}

export default function ProfileContent(props: ProfileContentProps) {
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
                    Nguyễn Văn A
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Ngày sinh:
                    </Typography>
                    30-2-2050
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Giới tính:
                    </Typography>
                    Nam
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>CCCD:</Typography>
                    123456789
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Địa chỉ:
                    </Typography>
                    510B - KTX Ngoại Ngữ - Xuân Thủy - Cầu Giấy - Hà Nội
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Điện thoại:
                    </Typography>
                    0334816745
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>Email:</Typography>
                    aa@ppp.com
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Vai trò:
                    </Typography>
                    Bệnh nhân
                </Grid>
            </Grid>
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
                    9812749872394
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Chiều cao:
                    </Typography>
                    183cm
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Cân nặng:
                    </Typography>
                    73kg
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Nhóm máu:
                    </Typography>
                    O
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Tiểu sử bệnh:
                    </Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label="Tiểu sử bệnh"
                        defaultValue={"Có tiền sử hen suyễn"}
                        multiline
                        rows={7}
                        sx={{ marginTop: 3 }}
                        fullWidth={true}
                        disabled
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}
