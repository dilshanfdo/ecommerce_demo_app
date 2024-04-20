import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, Box } from '@mui/material';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce';

const steps = ['Shipping Address', 'Payment Details'];

//mt: {sm:3, lg:6}, mb: {xs:3, sm:3, lg:6}, 

const CheckoutForm = ({cart, order, error, onCaptureCheckout}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
      setCheckoutToken(token);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNextButton = (data) => {
    setShippingData(data);
    nextStep();
  }

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const previousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  useEffect(() => {
    generateToken();
  }, [cart]);

  const Form = () => activeStep === 0 ?<AddressForm checkoutToken={checkoutToken} handleNextButton={handleNextButton} /> :<PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} previousStep={previousStep} onCaptureCheckout={onCaptureCheckout} />

  const Confirmation = () => (
    <div>
      Confirmation
    </div>
  );

  return (
    <>
      <Box sx={{width: {sm:600}, marginTop: '5%', ml: {sm:'auto'}, mr: {sm:'auto'}}}>
        <Paper sx={{width: '100%', px: {xs:1, sm:2, lg:3}, py: {xs:1, sm:2, lg:3} }}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} sx={{mb:2}}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ?<Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </Box>
    </>
  )
}

export default CheckoutForm