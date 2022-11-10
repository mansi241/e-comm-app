import React from 'react'
import {ThemeProvider, createTheme, CssBaseline} from '@mui/material';
import Header from './Header';
import {Outlet} from 'react-router-dom';
const theme = createTheme({
    palette : {
        mode : "light"
    }
});
export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>
        {/* renders nested routes components */}
            <Outlet />         
        </main>
        <footer></footer>
    </ThemeProvider>
  )
}
