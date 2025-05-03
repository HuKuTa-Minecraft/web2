import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from "C:/Projects/ssvr/labs/src/laba4/theme_toggle.jsx"; 

export default function Header({ onDrawerToggle }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'red' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onDrawerToggle} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="success" component={Link} to="/">Главная</Button>
          <Button color="success" component={Link} to="/about">О себе</Button>
        </Box>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}
