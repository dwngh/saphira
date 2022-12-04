import { AppBar, Button, Paper, SwipeableDrawer, Typography } from "@mui/material";
import { Fragment } from "react";
import ShiftList from "../../time/ShiftList";
import Box from "@mui/material/Box";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import EditProfileContent from "../../EditProfileContent";

interface SwipeableEditProfileProps {
    open: boolean;
    setOpen: (open) => void;
    userId;
    privilege?: boolean;
}

export default function SwipeableEditProfile(props: SwipeableEditProfileProps) {
    const { height, width } = useWindowDimensions();
    return (
        <Fragment>
            <SwipeableDrawer
                anchor="right"
                open={props.open}
                onOpen={() => props.setOpen(true)}
                onClose={() => props.setOpen(false)}
            >
                <Paper
                    sx={{
                        padding: 5,
                        height: height,
                        overflow: "auto",
                        backgroundColor: "#eaeff1",
                    }}
                >
                    <AppBar
                        color="primary"
                        position="relative"
                        sx={{
                            marginTop: -5,
                            marginBottom: 5,
                            marginRight: -5,
                            marginLeft: -5,
                            padding: 3,
                            width: 1000,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", margin: 1 }}
                        >
                            Edit Profile
                        </Typography>
                    </AppBar>
                    <EditProfileContent userId={props.userId} privilege={props.privilege}/>
                </Paper>
            </SwipeableDrawer>
        </Fragment>
    );
}
