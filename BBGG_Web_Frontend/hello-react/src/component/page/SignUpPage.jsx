import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FitbitIcon from '@mui/icons-material/Fitbit';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function SignUp() {
    const [Name, SetName] = useState("");
    const [Id, SetId] = useState("");
    const [Password, SetPassword] = useState("");
    const [ConfirmPassword, SetConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            Name: data.get('Name'),
            Id: data.get('Id'),
            Password: data.get('Password'),
            ConfirmPassword: data.get('ConfirmPassword')
        });
    };

    //axios
    
        
    const SignUpRegister = () => {
        if(Id != "" && Name != "" && Password != "" && ConfirmPassword != "") {
        axios.post("http://localhost:8080/bbgg/signup", {
            userId: Id,
            password: Password,
            userName: Name
        }).then(function (response) {
            alert("환영합니다.");
            navigate('/SignIn');
        }).catch(function (error) {
            console.log(error);
        });
    } else { alert("모든 항목을 기입해주세요.");}
}
    
    

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, color: 'primary.main', bgcolor: 'white' }}>
                        <FitbitIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        SIGN UP
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            Name="Name"
                            label="Name"
                            name="Name"
                            autoComplete="Name"
                            autoFocus
                            value={Name}
                            onChange={(event) => {
                                SetName(event.target.value);
                            }
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Id"
                            label="Id"
                            name="Id"
                            autoComplete="Id"
                            autoFocus
                            value={Id}
                            onChange={(event) => {
                                SetId(event.target.value);
                            }
                            }
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
                            value={Password}
                            onChange={(event) => {
                                SetPassword(event.target.value);
                            }
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Confirm password"
                            label="Confirm Password"
                            type="password"
                            id="Confirm password"
                            autoComplete="Confrim password"
                            value={ConfirmPassword}
                            onChange={(event) => {
                                SetConfirmPassword(event.target.value);
                            }
                            }
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                SignUpRegister();
                            }
                            }
                        >
                            회원 가입
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}