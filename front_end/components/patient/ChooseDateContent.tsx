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

interface ChooseDateContentProps {
    w_str;
}

interface ShiftLabelProps {
    shift;
    status;
    onShiftChoose: (e) => {};
}

const shiftList = [
    "7h00 - 8h00",
    "8h00 - 9h00",
    "9h00 - 10h00",
    "10h00 - 11h00",
    "13h30 - 14h30",
    "14h30 - 15h30",
    "15h30 - 16h30",
    "16h30 - 17h30",
];

// Status Value:
//     Normal: 0
//     Choosed: 1
//     Disable: 2
function ShiftLabel(props: ShiftLabelProps) {
    let shift = shiftList[props.shift];
    let variant = "outlined";
    if (props.status == 1) variant = "contained";
    return (
        <Button
            id={props.shift}
            type="submit"
            color="primary"
            variant={variant}
            sx={{
                borderRadius: 28,
                margin: 1,
                paddingLeft: 2,
                paddingRight: 2,
            }}
            onClick={props.onShiftChoose}
            disabled={props.status == 2}
        >
            {shift}
        </Button>
    );
}

export default function ChooseDateContent(props) {
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
                <Paper elevation={1} sx={{ marginTop: 3 }}>
                    <Typography variant="subtitle1" component="div">
                        {shiftList.map((shift, index) => {
                            const rows = [];
                            let status = 0;
                            if (index == choosedShift) status = 1;
                            if (index == 0) rows.push(<Divider />);
                            if (index == 4) rows.push(<Divider />);
                            rows.push(
                                <ShiftLabel
                                    shift={index}
                                    status={status}
                                    onShiftChoose={handleShiftChoose}
                                />
                            );
                            return rows;
                        })}
                    </Typography>
                </Paper>
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
                        sx={{ height: 40, borderRadius: 28, marginRight: 2}}
                        onClick={() => {setChoosedShift(-1)}}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: 40, borderRadius: 28}}
                        disabled={choosedShift == -1}
                    >
                        Tiếp tục
                    </Button>
                </Box>
            </Paper>
        </Paper>
    );
}
