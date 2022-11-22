import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

interface DateFilterProps {
    value;
    onCancel: () => void;
    onDateChange: (newValue) => void;
}

export default function DateFilter(props: DateFilterProps) {
    return (
        <Grid item>
            <Paper sx={{ padding: 0.5 }}>
                <Grid container spacing={0.5} alignItems="center">
                    <Grid item>
                        <IconButton onClick={props.onCancel}>
                            <ClearIcon
                                color="inherit"
                                sx={{ display: "block" }}
                            />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Chọn ngày khám"
                                inputFormat="MM/DD/YYYY"
                                value={props.value}
                                onChange={props.onDateChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        variant="filled"
                                        sx={{width: 230}}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}
