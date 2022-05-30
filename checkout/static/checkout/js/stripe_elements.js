/*

  Core logic/payment flow for this comes from here:
  https://stripe.com/docs/payments/accept-a-payment-charges

  CSS from here:
  https://stripe.com/docs/stripe-js

*/

const stripePublicKey = $('#id_stripe_public_key').text().slice(1, -1);
const clientSecret = $('#id_client_secret').text().slice(1, -1);

// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = Stripe(stripePublicKey);
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
const card = elements.create('card', { style: style });
card.mount('#card-element');

//  Handle real-time validation errors on the Stripe card element

card.addEventListener('change', function (event) {
  const errorDiv = document.getElementById('card-errors');
  if (event.error) {
    const html = `<span class="icon" role="alert"><i class="fas fa-times"></i></span><span>${event.error.message}</span>`;

    $(errorDiv).html(html);
  } else {
    errorDiv.textContent = '';
  }
})

// Handle form submission
const form = document.getElementById('payment-form')

form.addEventListener('submit', function (event) {
  event.preventDefault();
  card.update({ 'disabled': true });
  $('#submit-button').attr('disabled', true);
  $('#payment-form').fadeToggle(100);
  $('#loading-overlay').fadeToggle(100);
  stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
    }
  }).then(function (result) {
    if (result.error) {
      // Show error to your customer (e.g. insufficient funds)
      const errorDiv = document.getElementById('card-errors');
      const html = `<span class="icon" role="alert"><i class="fas fa-times"></i></span><span>${result.error.message}</span>`;

      $(errorDiv).html(html);

      $('#payment-form').fadeToggle(100);
      $('#loading-overlay').fadeToggle(100);

      card.update({ 'disabled': false });
      $('#submit-button').attr('disabled', false);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business-critical
        // post-payment actions.
        form.submit();
      }
    }
  })
})
