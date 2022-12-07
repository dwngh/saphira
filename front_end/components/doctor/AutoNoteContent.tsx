import {
    FormControlLabel,
    Grid,
    Paper,
    Switch,
    TextField,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import CalendarService from "../../service/CalendarService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../utils/useAuth";

interface AutoNoteContentProps {
    calendar?;
    onSaveData?;
}

export default function AutoNoteContent(props: AutoNoteContentProps) {
    const [enableAutoNote, setEnableAutoNote] = useState(false);
    const [note, setNote] = useState("");
    const [hasChange, setHasChange] = useState(false);
    const { accessToken } = useAuth();
    const { updateCalendar } = CalendarService();
    const handleChangeEnableAutoNote = () => {
        setEnableAutoNote(!enableAutoNote);
    };

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleSave = async () => {
        const nCalendar = { ...props.calendar };
        console.log("Handle save")
        console.log(enableAutoNote);
        console.log(note);
        if (enableAutoNote && (note === "" || note == null)) {
            toast.error("Không thể bật tự động thêm ghi chú với giá trị trống");
            return
        }
        nCalendar.enableAutoNote = enableAutoNote;
        nCalendar.note = note;
        let r = await updateCalendar(nCalendar, accessToken);
        if (r.affected == 1) {
            toast.success("Cập nhật cài đặt thành công");
            await props.onSaveData();
        } else {
            toast.warning("Cập nhật chưa thành công, vui lòng thử lại");
        }
    };

    useEffect(() => {
        if (props?.calendar && props.calendar.enableAutoNote == true)
            setEnableAutoNote(true);
        else setEnableAutoNote(false);
        setNote(props?.calendar ? props.calendar.note : "");
    }, []);

    useEffect(() => {
        console.log(enableAutoNote);
        if (
            !(
                ((props.calendar.enableAutoNote == null && !enableAutoNote) ||
                    props.calendar.enableAutoNote == enableAutoNote) &&
                (note === props.calendar.note ||
                    (props.calendar.note == null && note === ""))
            )
        ) {
            setHasChange(true);
        } else setHasChange(false);
    }, [enableAutoNote, note]);
    return (
        <Paper
            sx={{
                maxWidth: 936,
                margin: "auto",
                overflow: "hidden",
                height: 450,
                p: 3,
            }}
        >
            <Typography>
                <Grid container>
                    <Grid xs={4}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={enableAutoNote}
                                    onChange={handleChangeEnableAutoNote}
                                />
                            }
                            label="Thêm ghi chú tự động"
                            sx={{ m: 2 }}
                        />
                    </Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={2}>
                        <Box
                            m={2}
                            //margin
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                        >
                            <Button
                                variant="contained"
                                disabled={!hasChange}
                                onClick={handleSave}
                            >
                                Lưu
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Typography>
            <Typography variant="caption" sx={{ ml: 2 }}>
                Sau khi bật ghi chú này sẽ tự được gắn vào những yêu cầu tới bạn
            </Typography>
            <TextField
                id="outlined-multiline-static"
                label="Thêm ghi chú tự động"
                multiline
                rows={7}
                sx={{ width: 900, marginBottom: 3, mt: 1 }}
                value={note}
                onChange={handleNoteChange}
                disabled={!enableAutoNote}
            />
            <ToastContainer />
        </Paper>
    );
}
