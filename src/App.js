import React, { useState } from 'react';
import logo from './logo.svg';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, 
         CardElement, 
         useStripe, 
         useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

import 'bootswatch/dist/lux/bootstrap.min.css';         
import './App.css';

const stripePromise = loadStripe("pk_test_51HkdifAyxAUKi0wBrkETpErD81ppkc2auMQ891ulo9Z2tGc9WSp4XOiY3CCC9awNsdd3NagQLHPSMFwF7YveThFz00dcWm6X2C");

const CheckoutForm = ()=>{

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
        e.preventDefault();

   const {error, paymentMethod} = await stripe.createPaymentMethod({
      type:'card',
      card: elements.getElement(CardElement)
    });
    setLoading(true)

    if (!error){
      const { id } = paymentMethod;

     try {
      const {data} = await axios.post('http://localhost:3001/api/checkout', {
        id,
        amount: 10000
      });
      console.log(data);

      elements.getElement(CardElement).clear();
   }
      catch (error) {
       console.log(error);
     }
     setLoading(false);

    } 
    };
console.log(!stripe || loading);

  return <form onSubmit={handleSubmit} className="card card-body">
     <img
        src="https://www.corsair.com/medias/sys_master/images/images/h80/hdd/9029904465950/-CH-9109011-ES-Gallery-K70-RGB-MK2-01.png"
        alt="Corsair Gaming Keyboard RGB"
        className="img-fluid"
      />
      <h3 className="text-center my-2">Price: 100$</h3>
      <div className="form-group">
        <CardElement class="form-control"/>
      </div>

    <button className="btn btn-success" disabled={!stripe}> 
      {loading ? (<div className="spinner-border text-Light" role="status">
         <span className="sr-only">Loading...</span>
      </div> ) : ("Buy")}
    </button>

       </form>
}

function App() { 
  return (
      <Elements stripe={stripePromise}>
          <div className="container p-4">
            <div className="row">
              <div className="col-md-4 offset-md-4">
              <CheckoutForm/>
              </div>
            </div>
          </div>
      
      </Elements> 
    
  );
}

export default App;
