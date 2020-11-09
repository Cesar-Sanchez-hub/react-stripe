const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();

const stripe= new Stripe("sk_test_51HkdifAyxAUKi0wBk6ElWoTu1DH8BHgr53ArEHBZsKidXgFUJv7hqt0AwGUyqQTG93MN1LfssTtoZNDDJLNUE95a00Bzx2GH18");

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

app.post('/api/checkout', async (req,res)=>{
    
    try {
        const { id, amount } = req.body;
    
        const payment =  await stripe.paymentIntents.create({
             amount,
             currency: "USD",
             description: "Gaming Keyboard",
             payment_method: id,
             confirm: true,
         });
         console.log(payment);
         
        return res.status(200).json({message: 'Succesfull payment'});
    } catch (error) {
        console.log(error);
       return res.json({message: error.raw.message})
    }
   
});

app.listen(3001, ()=>{
    console.log('Server on port', 3001);
});