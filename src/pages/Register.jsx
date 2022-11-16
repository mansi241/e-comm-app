import React from 'react';
import { Container, Typography, Box, Grid, Link, CssBaseline,Button, Avatar, useTheme, TextField, FormControlLabel, Checkbox } from '@mui/material'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useAuth } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const {signUp} = useAuth();  
  const navigate = useNavigate();

  async function registerUser(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await signUp(data.get("email"), data.get("password"), data.get("name"))
    navigate("/login");
  }

  return ( 
  <Container component={"main"} maxWidth="xs">
    <CssBaseline />
    <Box sx={{
        mt:8,
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    }}>
        <Avatar sx={{
            m:1, bgcolor:"secondary.main"
        }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">Sign Up</Typography>
        <Box component={"form"} sx={{
            mt:3
        }} onSubmit={registerUser}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth required name="name" id="name" autoFocus label="Name" autoComplete="given-name"></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth required name="email" id="email" label="Email" autoComplete="email"></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth required name="password" id="password" type="password" label="P
                    assword" autoComplete="new-password"></TextField>
                </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{mt:3, mb:2}}>Register</Button>
            <Grid container justifyContent={"flex-end"}>
                <Grid item>
                    <Link variant="body2" href="/login">Already have an account? Sign In</Link>
                </Grid>
            </Grid>
        </Box>
    </Box>
  </Container>

    
  )
}
