import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthService } from "../service/AuthService"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storeAT } from '../redux/authSlice';
import { useAuth } from '../utils/useAuth';

const theme = createTheme();

export default function SignInSide() {
  const {fetchLogin} = AuthService();
  const {signin} = useAuth();
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo = {
      username: data.get('username'),
      password: data.get('password')
    }
    const Regex = /^[a-zA-Z0-9]+$/;
    if(!Regex.test(userInfo.username))
    {
      setIsUsernameValid(true)
    } else setIsUsernameValid(false)
    if(!Regex.test(userInfo.password))
    {
      setIsPasswordValid(true)
    } else setIsPasswordValid(false)
    if(Regex.test(userInfo.username) && Regex.test(userInfo.password)){
      const data = await fetchLogin(userInfo)
      if(data !== '') {
        signin(data);
        window.location.href = "/sample";
      } else alert('Error');
    }
    
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url('/img.jpg')`,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 20,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
    </ThemeProvider>
  );
}