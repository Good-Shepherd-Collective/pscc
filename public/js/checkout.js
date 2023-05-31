const response = await fetch('/.netlify/functions/createCheckout', {

document.addEventListener('DOMContentLoaded', () => {
  console.log('Checkout script loaded!');

  const checkoutButton = document.querySelector('#checkout-button');

  checkoutButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const monthlyAmount = document.querySelector('#monthly-amount').value;
    console.log('Monthly amount:', monthlyAmount);
    const response = await fetch('/.netlify/functions/createCheckout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name: 'Custom monthly donation',
        description: `Monthly donation of $${monthlyAmount}`,
        amount: parseFloat(monthlyAmount) * 100, // Convert to cents
        image: 'https://via.placeholder.com/150',
      }),
    });
    const session = await response.json();
    console.log('Checkout session:', session);

    const stripe = Stripe(window.STRIPE_PUBLISHABLE_KEY);

    stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
  });
})

});
console.log('Server response:', response);

if (response.ok) {
  const session = await response.json();
  console.log('Checkout session:', session);
  // ... (rest of the code)
} else {
  console.error('Server error:', await response.text());
}
