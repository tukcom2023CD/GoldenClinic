import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FitbitIcon from "@mui/icons-material/Fitbit";
import { Link as RouterLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  const [userId, SetUserId] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      Id: data.get("userId"),
      Password: data.get("password"),
    });
  };

  const SignInRegister = async () => {
    axios
      .post("http://localhost:8080/bbgg/login", {
        userId: userId,
        password: password,
      })
      .then(function (response) {
        alert("로그인 성공");
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("sessioninfo", null);

        document.location.href = "/";
        // navigate("/MainPage");
      })
      .catch(function (error) {
        alert("아이디/비밀번호를 확인하세요");
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/bbgg/login")
      .then((res) => console.log(res))
      .catch();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, color: "primary.main", bgcolor: "white" }}>
            <FitbitIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Id"
              label="Id"
              name="Id"
              autoComplete="Id"
              autoFocus
              value={userId}
              onChange={(event) => {
                SetUserId(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="Password"
              id="Password"
              autoComplete="Password"
              value={password}
              onChange={(event) => {
                SetPassword(event.target.value);
              }}
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
              onClick={() => {
                SignInRegister();
              }}
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
                <Typography
                  component={RouterLink}
                  to="/SignUp"
                  href="#"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Typography>
                <Routes>
                  <Route path="SignUpPage" element={<SignUpPage />}></Route>
                </Routes>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
