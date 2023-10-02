// src/Header.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div">
          Jeu de dé
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
