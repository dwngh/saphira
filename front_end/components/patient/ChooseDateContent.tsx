import * as React from "react";
import Paper from "@mui/material/Paper";
import { useEffect, useState, useRef } from "react";
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
import { Grid } from "@mui/material";
import { TimeSolve } from "../../common/time";
import { toast } from "react-toastify";

interface ChooseDateContentProps {
    setCalendar;
    calendar;
    onNextTab;
    onPreviousTab;
}

export default function ChooseDateContent(props: ChooseDateContentProps) {
    const [value, setValue] = useState<Dayjs | null>(null);
    const [orders, setOrders] = useState<any>([]);
    const [choosedShift, setChoosedShift] = useState(-1);
    const [weekStr, setWeekStr] = useState("0000000");
    const [shiftList, setShiftList] = useState("00000000");
    const bottomRef = useRef(null);
    const { getAvailableDayBit, getShiftAvailable, isEmpty } = TimeSolve();

    useEffect(() => {
        let temp = props.calendar?.avail
            ? getAvailableDayBit(props.calendar?.avail)
            : "1111111";
        temp = temp.substring(temp.length - 1) + temp.substring(0, 5);
        console.log(temp);
        setWeekStr(temp);
    }, []);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        let temp: any = bottomRef.current;
        if (value) temp?.scrollIntoView({ behavior: "smooth" });
        let date = value?.day() ?? -1;
        console.log(date);
        if (isEmpty(props.calendar?.avail)) setShiftList("11111111");
        else if (date == 0) {
            setShiftList(getShiftAvailable(props.calendar?.avail, 6));
        } else if (date > 0 && date <= 6) {
            setShiftList(getShiftAvailable(props.calendar?.avail, date - 1));
        }
    }, [value]);

    const handleShiftChoose = (e) => {
        let id = +e.currentTarget.id;
        setChoosedShift(id);
    };

    const isHavingShift = (date: Dayjs) => {
        let day = date.day();
        if (day > 6) return true;
        if (weekStr[day] == "0") return true;
        return false;
    };

    const handleSubmit = () => {
        props.setCalendar(value, choosedShift);
        props.onNextTab();
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
                            if (newValue?.isBefore(dayjs()))
                                toast.error(
                                    "Không thể chọn ngày trong quá khứ."
                                );
                            else setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Paper>
            <Paper sx={{ margin: 2, padding: 2 }}>
                <Typography variant="h5" component="div">
                    Chọn ca khám:
                </Typography>
                {value && (
                    <ShiftList
                        choosedShift={choosedShift}
                        onChooseShift={handleShiftChoose}
                        enable={true}
                        avail={shiftList}
                    />
                )}
                <div ref={bottomRef}></div>
                <Grid container>
                    <Grid xs={3} sx={{ padding: 3 }}>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{
                                height: 40,
                                borderRadius: 28,
                                marginRight: 2,
                            }}
                            onClick={props.onPreviousTab}
                        >
                            Quay lại
                        </Button>
                    </Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={3} sx={{ padding: 3 }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                height: 40,
                                borderRadius: 28,
                                marginRight: 2,
                            }}
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
                            onClick={handleSubmit}
                        >
                            Tiếp tục
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    );
}
