import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ShiftList from "../time/ShiftList";

interface ChooseDateContentProps {
    w_str;
}

export default function ChooseDateContent(props: ChooseDateContentProps) {
    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [choosedShift, setChoosedShift] = useState(-1);

    const handleShiftChoose = (e) => {
        let id = +e.currentTarget.id;
        setChoosedShift(id);
    };

    const isHavingShift = (date: Dayjs) => {
        let day = date.day();
        if (day >= 6) return true;
        console.log("The day is: " + day);
        if (props.w_str[day] == "0") return true;
        return false;
    };

    return (
        <Paper
            sx={{
                maxWidth: 936,
                margin: "auto",
                overflow: "auto",
                height: 450,
            }}
        >
            <Paper sx={{ margin: 2, padding: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        label="Chọn ngày"
                        orientation="landscape"
                        openTo="day"
                        value={value}
                        shouldDisableDate={isHavingShift}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Paper>
            <Paper sx={{ margin: 2, padding: 2 }}>
                <Typography variant="h5" component="div">
                    Chọn ca khám:
                </Typography>
                <ShiftList
                    choosedShift={choosedShift}
                    onChooseShift={handleShiftChoose}
                    enable={true}
                />
                <Box
                    m={2}
                    //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28, marginRight: 2 }}
                        onClick={() => {
                            setChoosedShift(-1);
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28 }}
                        disabled={choosedShift == -1}
                    >
                        Tiếp tục
                    </Button>
                </Box>
            </Paper>
        </Paper>
    );
}
