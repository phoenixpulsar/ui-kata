const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

require("dotenv").config();

initializeApp();

const crypto = require("crypto");
const {v4: uuidv4} = require("uuid");

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

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
  const token = req.body.token;

  try {
    // Create a verifier object
    const verify = crypto.createVerify("SHA256");
    verify.update(token.data); // Use token.data (which is dataToSign)
    verify.end();
    const isValid = verify.verify(publicKey, token.signature, "base64");

    if (isValid) {
      res.json({isValid: true, message: "Token is valid"});
    } else {
      res.status(400).json({isValid: false, message: "Invalid token"});
    }
  } catch (error) {
    console.error("Error verifying the token:", error);
    res.status(500).json({error: "Failed to verify token"});
  }
});

// =============================
// Add tokens on signup
// =============================
exports.addOnSignUpTokens = onRequest(async (req, res) => {
  const user = req.body.user;

  if (!user || !user.uid) {
    return res.status(400).json({error: "Invalid user data"});
  }

  const tokens = [];
  for (let i = 0; i < 10; i++) {
    const token = await generateToken();
    tokens.push(token);
  }

  try {
    await getFirestore().collection("customer_tokens").doc(user.uid).set({
      tokens: tokens,
    });

    res
        .status(200)
        .json({message: `Added user tokens on signup: ${user.uid}.`});
  } catch (error) {
    console.error("Error creating init tokens:", error);
    res.status(500).json({error: "Failed to create initial tokens"});
  }
});
