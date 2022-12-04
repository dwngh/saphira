import { AppBar, Button, Paper, SwipeableDrawer, Typography } from "@mui/material";
import { Fragment } from "react";
import ShiftList from "../../time/ShiftList";
import Box from "@mui/material/Box";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import ProfileContent from "../../ProfileContent";

interface SwipeableProfileProps {
    open: boolean;
    setOpen: (open) => void;
    userId;
}

export default function SwipeableProfile(props: SwipeableProfileProps) {
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
                            PROFILE
                        </Typography>
                    </AppBar>
                    <ProfileContent userId={props.userId} />
                </Paper>
            </SwipeableDrawer>
        </Fragment>
    );
}
