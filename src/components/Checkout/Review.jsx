import React from 'react';
import {Typography, List, ListItem, ListItemText} from '@mui/material';

const Review = ({checkoutToken}) => {
  console.log(checkoutToken)
  return (
    <>
      <Typography variant="h6" gutterBottom>OrderSummary</Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product) => (
          <ListItem style={{padding: '10px 0'}} key={product.name}>
            <ListItemText primaryTypographyProps={{fontWeight:500}} primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
          </ListItem>
        ))}
        <ListItem style={{padding: '10px 0'}}>
          <ListItemText primaryTypographyProps={{fontWeight:700}} primary="Total" />
          <Typography variant="subtitle1" style={{fontWeight: 700}}>
            {checkoutToken.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  )
}

export default Review