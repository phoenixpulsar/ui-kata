require("dotenv").config();
const { initializeApp } = require("firebase-admin/app");
const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors");
const { getFirestore } = require("firebase-admin/firestore");
const stripe = require("stripe")(
  "sk_test_51PIL7VKpOcGnLnRbXHBcqUF8SonQelhHAJyS2ExSvk8UCsPTyCcc8mWdr1U4kv9Ic1wQzcaU9Qpt1D5MKo4TSF2W008GSuLK3Z"
);

initializeApp();

const corsHandler = cors({
  origin: ["https://ordo-one-app.web.app", "http://localhost:5173"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
});

const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const privateKeyBase64 = process.env.PRIVATE_KEY;
const publicKeyBase64 = process.env.PUBLIC_KEY;
const privateKey = Buffer.from(privateKeyBase64, "base64").toString("utf-8");
const publicKey = Buffer.from(publicKeyBase64, "base64").toString("utf-8");

// ========================================
// Generate Token Server Side Firebase fn()
// ========================================
const generateToken = async () => {
  const tokenId = uuidv4();
  const createdAt = Date.now();

  // Create data to sign
  const dataToSign = JSON.stringify({
    tokenId,
    createdAt,
  });

  // Create a signer object
  const sign = crypto.createSign("SHA256");
  sign.update(dataToSign); // Use dataToSign
  sign.end();

  // Sign the data
  const signature = sign.sign(privateKey, "base64");

  const token = {
    data: dataToSign,
    signature: signature,
  };

  return token;
};

// =============================
// Verify Token Server Side
// =============================
exports.verifyToken = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const token = req.body.token;

    try {
      // Create a verifier object
      const verify = crypto.createVerify("SHA256");
      verify.update(token.data); // Use token.data (which is dataToSign)
      verify.end();
      const isValid = verify.verify(publicKey, token.signature, "base64");

      if (isValid) {
        res.json({ isValid: true, message: "Token is valid" });
      } else {
        res.status(400).json({ isValid: false, message: "Invalid token" });
      }
    } catch (error) {
      console.error("Error verifying the token:", error);
      res.status(500).json({ error: "Failed to verify token" });
    }
  });
});

// =============================
// Add tokens on signup
// =============================
exports.addOnSignUpTokens = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const user = req.body.user;

    if (!user || !user.uid) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    const tokens = [];
    try {
      for (let i = 0; i < 10; i++) {
        const token = await generateToken();
        tokens.push(token);
      }

      await getFirestore().collection("customer_tokens").doc(user.uid).set({
        tokens: tokens,
      });

      res.status(200).json({
        message: `Added user tokens on signup and pubkey: ${user.uid}, 
            ${publicKeyBase64}.`,
      });
    } catch (error) {
      console.error("Error creating init tokens:", error);
      res.status(500).json({
        error: "Failed to create initial tokens",
        details: error.message,
      });
    }
  });
});

// =============================
// Create Stripe Checkout Session
// =============================
exports.createCheckout = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1PILWJKpOcGnLnRbgRa6EtNp",
            quantity: 10,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
          },
        ],
        mode: "payment",
        success_url: `http://localhost:5173/success.html`,
        cancel_url: `http://localhost:5173/cancel.html`,
        automatic_tax: { enabled: true },
      });

      res.status(200).send({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).send({ error: "Failed to create checkout session" });
    }
  });
});
