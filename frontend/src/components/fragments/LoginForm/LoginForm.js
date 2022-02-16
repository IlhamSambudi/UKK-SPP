import React from 'react';
import axios from "axios"
import routes from '../../../configs/routes';
import { base_url } from '../../../configs/config';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

export default function LoginForm() {
    const [values, setValues] = React.useState({
        username: '',
        password: "",
        message: "",
        role: "admin",
        logged: false
    });
    const login = event => {
        let role = (values.role).toLowerCase()
        let checkData = {
            username: values.username,
            password: values.password
        }
        if (role === "siswa") {
            let url_siswa = base_url + "/siswa/login"
            axios.post(url_siswa, checkData)
                .then(response => {
                    setValues({ ...values, "logged": response.data.logged })
                    if (values.logged) {
                        setValues({ ...values, "role": response.data.role })
                        // console.log(values)
                        let user = response.data.data
                        let token = response.data.token
                        let role = response.data.role
                        localStorage.setItem("user", JSON.stringify(user))
                        localStorage.setItem("token", token)
                        localStorage.setItem("role", role)
                        window.location = "/siswa/home"
                    } else {
                        console.log("belum masuk gais")
                    }
                })
                .catch(error => console.log(error))
        } else {
            let url_admin_petugas = base_url + "/petugas/login"
            axios.post(url_admin_petugas, checkData)
                .then(response => {
                    setValues({ ...values, "logged": response.data.logged })
                    if (values.logged) {
                        setValues({ ...values, "role": response.data.data.role })
                        // console.log(values)
                        let user = response.data.data
                        let token = response.data.token
                        let fixRole = (response.data.data.level).toLowerCase()
                        localStorage.setItem("user", JSON.stringify(user))
                        localStorage.setItem("token", token)
                        localStorage.setItem("role", fixRole)
                        if (fixRole === "admin") {
                            window.location = routes.HOME_ADMIN
                        } else {
                            window.location = routes.HOME_PETUGAS
                        }
                    } else {
                        console.log("belum masuk gais")
                    }
                })
                .catch(error => console.log(error))
            console.log("belum masuk gais")
        }
    }
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values)
    };
    

    return (
        /*<div className="row">
            <div className="col bgLogin">halo</div>
            <div className="col">
                <div>
                    <label for="email" className="form-label">Username</label>
                    <input value={values.username} onChange={handleChange("username")} type="email" 
                    className="form-control" id="email" />
                </div>
                <div>
                    <label for="inputPassword" className="form-label">Password</label>
                    <input value={values.password} onChange={handleChange("password")} type="password" 
                    className="form-control" id="inputPassword" />
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input value="admin" onClick={handleChange("role")} type="radio" id="customRadioInline1" name="customRadioInline" class="custom-control-input" />
                    <label class="custom-controllabel" for="customRadioInline1">Admin</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input value="petugas" onClick={handleChange("role")} type="radio" id="customRadioInline2" name="customRadioInline" class="custom-control-input" />
                    <label class="custom-controllabel" for="customRadioInline2">Petugas</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input value="siswa" onClick={handleChange("role")} type="radio" id="customRadioInline3" name="customRadioInline" class="custom-control-input" />
                    <label class="custom-controllabel" for="customRadioInline3">Siswa</label>
                </div>
                <button onClick={ev => login(ev)}>Login</button>
            </div >
        </div>*/
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            type="username"
                            autoFocus
                            value={values.username} onChange={handleChange("username")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="inputPassword"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={values.password} onChange={handleChange("password")}
                        />
                        <RadioGroup 
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group">
                            <FormControlLabel value="admin" onClick={handleChange("role")} control={<Radio />} label="Admin" />
                            <FormControlLabel value="petugas" onClick={handleChange("role")} control={<Radio />} label="Petugas" />
                            <FormControlLabel value="siswa" onClick={handleChange("role")} control={<Radio />} label="Siswa" />
                        </RadioGroup>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={ev => login(ev)}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}