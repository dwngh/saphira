import * as React from "react";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

export default function SuccessContent() {
    const router = useRouter();
    return (
        <Paper
            sx={{
                maxWidth: 936,
                margin: "auto",
                overflow: "auto",
                height: 450,
            }}
        >
            <Box sx={{ margin: 3 }}>
                <Typography
                    variant="h5"
                    component="div"
                    color="primary"
                    sx={{ fontWeight: "bold", marginLeft: 2, marginBottom: 3 }}
                >
                    THÀNH CÔNG
                </Typography>
                <Box sx={{ m: 2 }}>
                    <Typography variant="body1">
                        Yêu cầu vừa được tạo mới. Bạn có thể xem lại yêu cầu ở
                        mục quản lý yêu cầu.
                    </Typography>
                    <Typography variant="body1">
                        Hãy nhớ đến khám đúng giờ, đúng ca đã chọn. Nếu có việc
                        đột xuất, bạn có thể thay đổi ca trong ngày hôm đó.
                    </Typography>
                </Box>
                <Box
                    m={2}
                    //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button
                        variant="outlined"
                        color="success"
                        sx={{ height: 40, borderRadius: 28, marginRight: 2 }}
                        onClick={() => router.push("/patient/home")}
                    >
                        Quay lại
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
