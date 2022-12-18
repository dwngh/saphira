import { Box, Card, CardActionArea, Grid, Popper, Typography } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";

interface NotificationsProps {
    anchor;
    open;
    notifications;
    onMarkRead;
    onMarkAllRead;
}

export default function Notifications(props: NotificationsProps) {
    const router = useRouter();
    const { anchor, open, notifications, onMarkRead, onMarkAllRead } = props;

    const handleClickNotification = async (e) => {
        let id = +e.currentTarget.id;
        let noti = notifications.filter(item => item.id == id)[0];
        await onMarkRead(id);
        router.push(noti.url);
    }

    const handleClickReadAllNotification = () => {
        onMarkAllRead();
    }

    return (
        <Popper
            anchorEl={anchor}
            id="account-menu"
            open={open}
            sx={{ width: 300 }}
        >
            <Box
                sx={{
                    border: 1,
                    p: 1,
                    bgcolor: "background.paper",
                    overflow: "auto",
                }}
            >
                <Grid container>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            color="primary"
                            sx={{ fontWeight: "bold" }}
                        >
                            THÔNG BÁO
                        </Typography>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                        >
                            <Typography
                                variant="caption"
                                onClick={handleClickReadAllNotification}
                            >
                                Đánh dấu đã đọc
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    border: 1,
                    p: 1,
                    bgcolor: "background.paper",
                    height: 300,
                    overflow: "auto",
                }}
            >
                {notifications.map((notification) => (
                    <Card variant="outlined" sx={{ mt: 1 }}>
                        <CardActionArea id={notification?.id} sx={{ padding: 2, bgcolor: notification.read ? '#dedfe0' : '#ffffff' }} onClick={handleClickNotification}>
                            <Typography variant="body1">
                                {notification?.content}
                            </Typography>
                            <Typography variant="caption">
                                {dayjs(notification?.created_at).format(
                                    "HH:mm DD/MM/YYYY"
                                )}
                            </Typography>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Popper>
    );
}
