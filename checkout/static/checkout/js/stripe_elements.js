/*

  Core logic/payment flow for this comes from here:
  https://stripe.com/docs/payments/accept-a-payment-charges

  CSS from here:
  https://stripe.com/docs/stripe-js

*/

const stripe_public_key = $('#id_stripe_public_key').text().slice(1, -1);
const client_secret = $('#id_client_secret').text().slice(1, -1);

// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = Stripe(stripe_public_key);
const elements = stripe.elements();
const style = {
  base: {
    color: '#000',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    "::placeholder": {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#dc3545',
    iconColor: '#dc3545'
  }
}
const card = elements.create('card', {style: style});
card.mount('#card-element');
