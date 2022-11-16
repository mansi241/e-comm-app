import React from 'react'
import { Container, Typography, Box, Grid, Link, CssBaseline,Button, Avatar, useTheme, TextField } from '@mui/material'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useAuth } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {signIn} = useAuth();

  async function login(event){
    event.preventDefault();

    const {email, password} = event.target;
    await signIn(email.value, password.value);
    navigate("/")
  }

  return (
    <Container component={"main"} maxWidth="xs">
      {/* CssBaseLine to get rid of browser specific styles */}
      <CssBaseline />  
      <Box sx={{
        mt: theme.spacing(8),
        display: "flex",
        flexDirection:"column",
        alignItems:"center"
      }}
      >
        <Avatar sx={{
          m:1,
          backgroundColor: theme.palette.secondary.main
        }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign In
        </Typography>
        <form sx={{
          width:"100%",
          mt:1
        }} onSubmit={login}>
          <TextField label="email" variant="outlined" margin="normal" required fullWidth id="email" name="email" type="email" autoFocus autoComplete='off'></TextField>
          <TextField label="password" variant="outlined" margin="normal" required fullWidth id="password" name="password" type="password" autoFocus autoComplete='current-password'></TextField>

          <Button type="submit" variant="contained" fullWidth color="primary" sx={{
            m:theme.spacing(3,0,2)
          }}>Sign In</Button>

        </form>
        <Grid container justifyContent={"flex-end"}>
                <Grid item>
                    <Link variant="body2" href="/register">New User? Sign Up</Link>
                </Grid>
            </Grid>
      </Box>
    </Container>
  )
}
