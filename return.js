async function getSessionStatus() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  const response = await fetch(
    `https://getsessionstatus-h5q4nbdnia-uc.a.run.app?session_id=${sessionId}`
  );
  const session = await response.json();

  if (session.status == "open") {
    window.replace("http://localhost:5174/checkout.html");
  } else if (session.status == "complete") {
    document.getElementById("success").classList.remove("hidden");
    document.getElementById("customer-email").textContent =
      session.customer_email;
  }
}

export default getSessionStatus;
