import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthService } from "../service/AuthService";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeAT } from "../redux/authSlice";
import { useAuth } from "../utils/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const theme = createTheme();

export default function SignInSide() {
    const { fetchLogin, fetchUser } = AuthService();
    const { accessToken, role, signin, storeProfile } = useAuth();
    const router = useRouter();
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        let msg;
        if (router.query?.signupSuccess) {
            toast.success("Sign up successfully! Please login.", {
                toastId: "sign-in-success",
            });
        }
        if ((msg = router.query?.error)) {
            toast.error(msg, {
                toastId: "error-" + msg,
            });
        }
        if ((msg = router.query?.warning)) {
            toast.error(msg, {
                toastId: "warning-" + msg,
            });
        }
    }, [router.query]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userInfo = {
            username: data.get("username"),
            password: data.get("password"),
        };
        const Regex = /^[a-zA-Z0-9]+$/;
        if (!Regex.test(userInfo.username)) {
            setIsUsernameValid(true);
        } else setIsUsernameValid(false);
        if (!Regex.test(userInfo.password)) {
            setIsPasswordValid(true);
        } else setIsPasswordValid(false);
        if (Regex.test(userInfo.username) && Regex.test(userInfo.password)) {
            const data = await fetchLogin(userInfo);
            console.log(data);
            if (data) {
                signin(data);
                let user = await fetchUser(data.access_token);
                console.log(user);
                storeProfile(user);
                let roleStr = "";
                switch (user.role) {
                    case 1:
                        roleStr = "patient";
                        break;
                    case 2:
                        roleStr = "doctor";
                        break;
                    case 3:
                        roleStr = "secretary";
                        break;
                    case 0:
                        roleStr = "admin";
                        break;
                }
                if (roleStr != "") window.location.href = `/${roleStr}/home`;
                else
                    toast.error(
                        "Unexpected error! Please try to signin again."
                    );
            } else toast.error("Username not found or incorrect password!");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url('/login_bg.jpg')`,
                        width: "100%",
                        height: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 20,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                error={isUsernameValid}
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="UserName"
                                autoFocus
                            />
                            <TextField
                                error={isPasswordValid}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <ToastContainer />
        </ThemeProvider>
    );
}
