import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthService } from "../service/AuthService";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const theme = createTheme();

export default function SignUp() {
    const { fetchSignUp } = AuthService();
    const router = useRouter();

    // const [role, setRole] = React.useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //   setRole(event.target.value);
    // };
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isFullnameValid, setIsFullnameValid] = useState(false);
    const [isIdentityNumValid, setIsIdentityNumValid] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userInfo = {
            name: data.get("fullName") + "",
            username: data.get("username") + "",
            password: data.get("password") + "",
            identity_num: data.get("identity_num") + "",
            role: 1,
        };
        const Regex = /^[a-zA-Z0-9]+$/;
        const RegexName = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
        const RegexNum = /^[0-9]+$/;
        if (!Regex.test(userInfo.username)) {
            setIsUsernameValid(true);
        } else setIsUsernameValid(false);
        if (!Regex.test(userInfo.password)) {
            setIsPasswordValid(true);
        } else setIsPasswordValid(false);
        if (!RegexName.test(userInfo.name)) {
            setIsFullnameValid(true);
        } else setIsFullnameValid(false);
        if (!RegexNum.test(userInfo.identity_num)) {
            setIsIdentityNumValid(true);
        } else setIsIdentityNumValid(false);
        if (
            Regex.test(userInfo.username) &&
            Regex.test(userInfo.password) &&
            RegexName.test(userInfo.name) &&
            RegexNum.test(userInfo.identity_num)
        ) {

            let data = await fetchSignUp(userInfo);
            console.log(data);
            if (data?.status == 201) {
                router.push({
                    pathname: "/login",
                    query: { signupSuccess: 1 },
                });
            } else toast.error("Sign up error!");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={isFullnameValid}
                                    autoComplete="given-name"
                                    name="fullName"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={isUsernameValid}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={isPasswordValid}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={handleChange}
                  >
                    <MenuItem value={0}></MenuItem>
                    <MenuItem value={1}>Twenty</MenuItem>
                    <MenuItem value={2}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    error={isIdentityNumValid}
                                    required
                                    fullWidth
                                    name="identity_num"
                                    label="Identity Number"
                                    id="identity_num"
                                    autoComplete="identity number"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link onClick={() => router.push("/login")} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <ToastContainer />
            </Container>
        </ThemeProvider>
    );
}
