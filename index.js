const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use environment variable
const bodyParser = require('body-parser');
const cors = require('cors');


// Load environment variables from .env file


const app = express();
app.use(bodyParser.json());
app.use(cors()); // Allow requests from the frontend

app.post('/create-payment-intent', async (req, res) => {
  console.log(req.body);
  try {
    const { amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
