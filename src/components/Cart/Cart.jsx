import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {

  const EmptyCart = () => (
    <Typography variant='subtitle1'>You have no items in your shopping cart, 
      <Link to="/" style={{textDecoration: 'none'}}>start adding some!</Link>
    </Typography>
  );
  
  const FilledCart = () => (
    <>
      {/* <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item}/>
          </Grid>
        ))}
      </Grid> */}

      <Box display="flex" flexDirection="column" px={2} gap={2}>
        {cart.line_items.map((item) => (
            <CartItem item={item} key={item.id} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
        ))}
      </Box>

      <div style={{display: 'flex', marginTop: '10%', width: '100%', justifyContent: 'space-between'}}>
        <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button size='large' type='button' variant='contained' color='secondary' sx={{minWidth: '150px', mr: {sm: '20px'}, mb: {xs: '5px'}}} onClick={handleEmptyCart}>Empty Cart</Button>
          <Button component={Link} to="/checkout" size='large' type='button' variant='contained' color='primary' sx={{minWidth: '150px'}}>Checkout</Button>
        </div>
      </div>
    </>
 );

  if(!cart.line_items) return 'Loading...';

  return (
    <Container style={{marginTop: '5%'}}>
      <Typography mb={3} variant='h3'>Your Shopping Cart</Typography>
      <Box sx={{borderBottom: '1px solid gray', mx: '16px', marginBottom: 2}}></Box>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart