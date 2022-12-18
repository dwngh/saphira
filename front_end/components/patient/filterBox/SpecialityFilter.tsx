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

interface SpecialityFilterProps {
    value;
    onChange: (e) => void;
    onCancel: () => void;
    specialities;
}

export default function SpecialityFilter(props: SpecialityFilterProps) {
    const {value, specialities, onChange} = props;
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
                        label="Tên chuyên khoa"
                        size="small"
                        sx={{width: 230}}
                        select
                        value={value}
                        onChange={onChange}
                    >
                        {specialities.map(speciality => (
                            <MenuItem key={speciality.id} value={speciality.id}>
                                {speciality.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
    );
}
