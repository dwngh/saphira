import { Grid, Paper, TextField, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachmentTable from "./card/AttachmentTable";

interface AttachmentContentProps {}

export default function AttachmentContent(props: AttachmentContentProps) {
    return (
        <Paper
            sx={{
                maxWidth: 1000,
                margin: "auto",
                overflow: "hidden",
                height: 480,
                p: 3,
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
                            placeholder="Nhập ID yêu cầu ..."
                            InputProps={{
                                disableUnderline: true,
                                sx: { fontSize: "default" },
                            }}
                            variant="standard"
                        />
                    </Grid>
                </Grid>
            </Toolbar>
            <AttachmentTable />
        </Paper>
    );
}
