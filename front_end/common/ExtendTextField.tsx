import TextField from "@mui/material/TextField";

interface ExtendTextfieldProps {
    value?;
    error?;
    margin?;
    required?;
    fullWidth?;
    name?;
    label?;
    type?;
    id?;
    autoComplete?;
}
export default function ExtendTextfield(props: ExtendTextfieldProps) {
    return (
        <>
            {props.value ? (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    defaultValue={props.value}
                />
            ) : (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
            )}
        </>
    );
}
