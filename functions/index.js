const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

const fs = require("fs");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

const privateKey = fs.readFileSync("private_key.pem", "utf-8");
const publicKey = fs.readFileSync("../public_key.pem", "utf-8");

// ========================================
// Generate Token Server Side Firebase fn()
// ========================================
exports.generateToken = onRequest(async (req, res) => {
  //   const userId = req.user.id; // Assuming you have the user's ID from the request context
  const tokenId = uuidv4(); // Generate a unique token ID
  const createdAt = Date.now(); // Token expires in 1 hour

  // Create data to sign
  const dataToSign = JSON.stringify({
    tokenId,
    createdAt,
  });

  try {
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

    const writeResult = await getFirestore()
      .collection("tokens")
      .add({ token: token });

    // Send back a message that we've successfully written the message
    res.json({
      result: `Message with ID: ${writeResult.id} added.`,
      token: token,
    });
  } catch (error) {
    console.error("Error signing or verifying the token:", error);
    res.status(500).json({ error: "Failed to generate or verify token" });
  }
});

// =============================
// Verify Token Server Side
// =============================
exports.verifyToken = onRequest(async (req, res) => {
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

// ===============================
// Generate Initial TOKENS for APP
// ===============================

exports.createCustomerInitialTokens = functios.auth
  .user()
  .onCreate(async (user) => {
    const tokens = [];
    for (let i = 0; i < 10; i++) {
      const token = await generateToken();
      tokens.push(token);
    }

    await admin.firestore().collection("customer_tokens").doc(user.uid).set({
      tokens: tokens,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
