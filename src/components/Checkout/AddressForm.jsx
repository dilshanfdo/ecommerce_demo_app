import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {InputLabel, Select, MenuItem, Button, Grid, Typography, Box} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';
import CustomTextField from './CustomTextField';

const AddressForm = ({checkoutToken, handleNextButton}) => {
  // console.log('checkoutToken: ', checkoutToken.shipping_methods)
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();
 
  // const countries = Object.entries(shippingCountries).map((item) => ({id: item[0], label: item[1]}));
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));
  const options = checkoutToken.shipping_methods.map((option) =>({
    id: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`
  }))

  const fetchShippingCountries = async (checkoutTokenId) => {
    // const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
    // setShippingCountries(countries);
    const response = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(response.countries);
    setShippingCountry(Object.keys(response.countries)[0]);
  }

  const fetchShippingSubdivisions = async (countryCode) => {
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);    
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  // const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
  //   // console.log(country);
  //   const {options} = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
  //   console.log('Options: ', options) ;   
  //   setShippingOptions(options);
  //   // setShippingOption(Object.keys(options)[0].id);
  // }

  const assignShippingOption = () => {
    setShippingOption(options[0].id);
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
    if(options){
      assignShippingOption();
    }
  }, [])

  useEffect(() => {
    if(shippingCountry){
      fetchShippingSubdivisions(shippingCountry);
    }    
  }, [shippingCountry])

  // useEffect(() => {
  //   if(shippingSubdivision){
  //     console.log('test');
  //     fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  //   }    
  // }, [shippingSubdivision]) 

  if(!shippingSubdivision) return 'Loading...';

  return (
    <Box sx={{px:1}}>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => handleNextButton({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={3}>
            <CustomTextField name='firstName' label='First Name' />
            <CustomTextField name='lastName' label='Last Name' />
            <CustomTextField name='address' label='Address' />
            <CustomTextField name='city' label='City' />
            <CustomTextField name='state' label='State' />
            <CustomTextField name='postCode' label='Post Code' />
            <CustomTextField name='email' label='Email' />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}                
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}                
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}               
              </Select>
            </Grid>
          </Grid>
          <br />
          <Box sx={{display:'flex', justifyContent:'flex-end'}}>
            <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
            <Button></Button>
            <Button variant="contained" type="submit" color="primary">Next</Button>
          </Box> 
        </form>
      </FormProvider>
    </Box>
  )
}

export default AddressForm