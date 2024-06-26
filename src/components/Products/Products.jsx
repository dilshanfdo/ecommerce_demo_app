import React from 'react';
import { Grid } from '@mui/material';
import Product from '../Product/Product';

// const products = [
//   {id: 1, name: 'Shoes', description: 'Running shoes', price: '$5'},
//   {id: 2, name: 'Macbook', description: 'Apple macbook', price: '$10'}
// ]

function Products({products, onAddToCart}) {
  return (
    <main style={{flexGrow: 1, padding: '12px', backgroundColor: '#F8F8F8'}}>
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default Products