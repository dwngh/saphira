import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";

interface SpecialityFilterProps {
    value;
    onChange: (hospitalId) => void;
    onCancel: () => void;
}

export default function SpecialityFilter(props: SpecialityFilterProps) {
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon
                                        color="inherit"
                                        sx={{ display: "block" }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{width: 230}}
                    />
                </Grid>
            </Grid>
            </Paper>
        </Grid>
    );
}
