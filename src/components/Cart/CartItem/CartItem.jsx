import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Grid, ButtonBase } from '@mui/material';

const CartItem = ({item, onUpdateCartQty, onRemoveFromCart}) => {
  // console.log('item: ', item)
  return (
    <Grid container sx={{borderBottom: '1px solid gray'}}>
      <Grid item container alignItems="center" xs={3} sx={{direction: {sm: 'column', md: 'row'}}} >
        <Grid item>
          <ButtonBase sx={{ width: {sm: 50, md: 100}, height: {sm: 50, md: 100}}}>
            <img alt={item.name} src={item.image.url} style={{margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%'}}/>
          </ButtonBase>
        </Grid>
        <Grid item justifyContent='flex-start'>
          <Typography gutterBottom variant="subtitle1" component="div">
            {item.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={9} alignItems="center">
        <Grid item container xs={10} justifyContent="center">
          <Grid item sm={4} display='flex' justifyContent="center" >
            <Typography gutterBottom variant="subtitle1" component="div">
              {item.price.formatted_with_symbol}
            </Typography>
          </Grid>
          <Grid item container sm={4} justifyContent="center" sx={{marginBottom: {xs: '0.35em', sm: 0}}}>
            <Button type='button' sx={{minWidth: '25px'}} onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
            <Typography variant="subtitle1" component="div" sx={{border: '1px solid gray', width: '50px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >{item.quantity}</Typography>
            <Button type='button' sx={{minWidth: '25px'}} onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
          </Grid>
          <Grid item sm={4} display="flex" justifyContent="center">
            <Typography gutterBottom variant="subtitle1" component="div">
              ${item.price.raw * item.quantity}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={2} justifyContent='center'>
          <Button variant='contained' type='button' color='secondary' size='small' onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
        </Grid>
      </Grid>
      {/* <Grid item>
        <ButtonBase sx={{ width: 128, height: 128 }}>
          <img alt={item.name} src={item.image.url} style={{margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%'}}/>
        </ButtonBase>
      </Grid>
      <Grid item>
        <Typography gutterBottom variant="subtitle1" component="div">
          {item.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography gutterBottom variant="subtitle1" component="div">
          {item.price.formatted_with_symbol}
        </Typography>
      </Grid> */}
    </Grid>
  )
}

export default CartItem