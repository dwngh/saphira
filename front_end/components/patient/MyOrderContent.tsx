import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterListIcon from "@mui/icons-material/FilterList";
import OrderCard from "./card/OrderCard";
import { useState, Fragment } from "react";
import SwipeableOrderDetail from "./card/SwipeableOrderDetail";

export default function MyDoctorContent() {
    const [open, setOpen] = useState(false);
    const handleOpenDetail = (id) => {
        console.log("Opening detail of" + id);
        setOpen(true);
    };
    return (
        <Paper
            sx={{
                maxWidth: 936,
                margin: "auto",
                overflow: "hidden",
                height: 450,
            }}
        >
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <SearchIcon color="inherit" sx={{ display: "block" }} />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            placeholder="ID Yêu cầu ..."
                            InputProps={{
                                disableUnderline: true,
                                sx: { fontSize: "default" },
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip title="Reload">
                            <IconButton onClick={() => {}}>
                                <FilterListIcon
                                    color="inherit"
                                    sx={{ display: "block" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
            <Paper
                style={{
                    maxHeight: 400,
                    overflow: "auto",
                }}
                variant="outlined"
                square
            >
                <OrderCard
                    item={{
                        id: 123,
                        status: 0,
                        doctor: "abc",
                        time: "Ca 7h00 - 8h00 30-2-2050",
                        address: "Sao hỏa",
                        note: "Nhớ đem theo đĩa bay",
                    }}
                    onOpenDetail={handleOpenDetail}
                    attachments={[
                        { name: "Don-thuoc.doc", href: "#" },
                        { name: "ket-qua-xet-nghiem-mau.pdf", href: "#" },
                    ]}
                />
                <OrderCard
                    item={{
                        id: 133,
                        status: 1,
                        doctor: "abc",
                        time: "Ca 7h00 - 8h00 30-2-2050",
                        address: "Sao hỏa",
                    }}
                    onOpenDetail={handleOpenDetail}
                    attachments={[
                        { name: "Don-thuoc.doc", href: "#" },
                        { name: "ket-qua-xet-nghiem-mau.pdf", href: "#" },
                        { name: "ketqua.pdf", href: "#" },
                        { name: "ket-qua-xet-nghiem-mau.pdf", href: "#" },
                    ]}
                />
                <OrderCard
                    item={{
                        id: 143,
                        status: 2,
                        doctor: "abc",
                        time: "Ca 7h00 - 8h00 30-2-2050",
                        address: "Sao hỏa",
                    }}
                    onOpenDetail={handleOpenDetail}
                    attachments={[]}
                />
                <OrderCard
                    item={{
                        id: 153,
                        status: 3,
                        doctor: "abc",
                        time: "Ca 7h00 - 8h00 30-2-2050",
                        address: "Sao hỏa",
                    }}
                    onOpenDetail={handleOpenDetail}
                    attachments={[]}
                />
            </Paper>
            <SwipeableOrderDetail open={open} setOpen={setOpen} order={{}} />
        </Paper>
    );
}
