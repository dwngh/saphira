import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import { MenuItem } from "@mui/material";

interface HospitalFilterProps {
    value;
    onChange: (e) => void;
    onCancel: () => void;
    hospitals;
}

export default function HospitalFilter(props: HospitalFilterProps) {
    const {hospitals, value, onChange } = props;
    return (
        <Grid item>
            <Paper sx={{padding: 0.5}}>
            <Grid container spacing={0.5} alignItems="center">
                <Grid item>
                    <IconButton onClick={props.onCancel}>
                        <ClearIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                </Grid>
                <Grid item>
                    <TextField
                        label="Tên bệnh viện"
                        size="small"
                        sx={{width: 230}}
                        value={value}
                        onChange={onChange}
                        select
                    >
                        {hospitals.map(hospital => (
                            <MenuItem key={hospital.id} value={hospital.id}>
                                {hospital.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
    );
}
