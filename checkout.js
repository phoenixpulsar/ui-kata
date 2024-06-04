// This is your test publishable API key.
const stripe = Stripe(
  "pk_test_51PIL7VKpOcGnLnRb34247PM0yn5lhCGTVtvoHzeSieoF6LOguc96ggKEwtFmC1f7hsJcFOkFNjY4ucwtPyUolv8800iFnKZILO"
);

// Create a Checkout Session
async function initializeCheckout() {
  const fetchClientSecret = async () => {
    const response = await fetch(
      "https://createcheckoutsession-h5q4nbdnia-uc.a.run.app",
      {
        method: "POST",
      }
    );
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount("#checkout");
}

export default initializeCheckout;
