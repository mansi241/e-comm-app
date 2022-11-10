import React from 'react'
import AppBar from '@mui/material/AppBar'
import {Toolbar, IconButton, Badge, Button} from '@mui/material'
import {Typography, Box} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function Header() {
  return (
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant="h6" color="inherit" sx={{
                flexGrow:1
            }}>
                Ecomm
            </Typography>
            <Box sx={{display : {md: "flex"}}}>
                <IconButton size="large" aria-label="shows cart item count" color="inherit">
                    <Badge badgeContent={1} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Box>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
  )
}
