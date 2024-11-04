import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_51QGei4JXvQhfvRVK0pKdq1gpK7EOsILCRbEwx18ptqGAsMju5PlG4cGh79lrkCucP2ZLYTdZjOacfWcDUQkWjiL900OoE15OmA')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
   <Elements stripe={stripePromise}>
      <App />
   </Elements>
  </BrowserRouter>
);
