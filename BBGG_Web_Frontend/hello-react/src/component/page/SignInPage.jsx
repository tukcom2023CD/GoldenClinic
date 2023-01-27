import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FitbitIcon from '@mui/icons-material/Fitbit';
import { Link as RouterLink } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./SignUpPage";

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      Id: data.get('Id'),
      password: data.get('password'),
    });
  };

  return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Avatar sx={{ m: 1, color: 'primary.main', bgcolor: 'white' }}>
              <FitbitIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              SIGN IN
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Id"
                  label="Id"
                  name="Id"
                  autoComplete="Id"
                  autoFocus
              />
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
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="자동로그인"
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                로그인
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography href="#" variant="body2">
                    Forgot password?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component={RouterLink} to="/SignUp" href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Typography>
                  <Routes>
                    <Route path="SignUpPage" element={<SignUpPage/>}></Route>
                  </Routes>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

  );
}