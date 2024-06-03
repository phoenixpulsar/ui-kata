// This is your test publishable API key.
const stripe = Stripe(
  "pk_test_51PIL7VKpOcGnLnRb34247PM0yn5lhCGTVtvoHzeSieoF6LOguc96ggKEwtFmC1f7hsJcFOkFNjY4ucwtPyUolv8800iFnKZILO"
);

// Create a Checkout Session
export async function initializeCheckout() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount("#checkout");
}
