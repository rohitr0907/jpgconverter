import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logoImage from '../assets/jpg.png'

export default function ButtonAppBar() {
  return (
    <Box sx={{  }}>
        <AppBar position="fixed" color='grey' sx={{alignContent:"center"}}>
        <Toolbar sx={{display:"flex"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logoImage} style={{height:"27px",width:"30px"}}/>   
          <Typography variant='h6' sx={{fontWeight:"Bold"}} component="div" >
            JPG Converter
          </Typography>
          <Typography variant='body2' sx={{ml:4,fontWeight:"bold",paddingTop:"2px ",color:"blue",textDecoration:"underline  "}}>Compress Image</Typography>
        </Toolbar>
        </AppBar>
    </Box>
  );
}
