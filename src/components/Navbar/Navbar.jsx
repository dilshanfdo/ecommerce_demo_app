import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import logo from '../../assets/commerce.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({totalItems}) => {
  const location = useLocation();

  return (
    <>
      <AppBar position='static' color='inherit' sx={{boxShadow: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}>
        <Toolbar>
          <Typography variant='h6' color='inherit' sx={{display: 'flex', flexGrow: 1, alignItems: 'center', textDecoration: 'none'}} component={Link} to="/">
            <img src={logo} alt='Commerce.js' height='25px' style={{marginRight: '10px'}} />
            Commerce.js
          </Typography>
          {location.pathname === '/' && 
          (<Box sx={{borderRadius: '20px', backgroundColor: '#F8F8F8'}}>
            <IconButton component={Link} to="/cart" aria-label='Show cart items' color='inherit'>
              <Badge badgeContent={totalItems} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>)}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar