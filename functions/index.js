/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const logger = require("firebase-functions/logger");
const { onRequest } = require("firebase-functions/v2/https");

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const fs = require("fs");
const path = require("path");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addmessage = onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// Listens for new messages added to /messages/:documentId/original
// and saves an uppercased version of the message
// to /messages/:documentId/uppercase
exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
  // Grab the current value of what was written to Firestore.
  const original = event.data.data().original;

  // Access the parameter `{documentId}` with `event.params`
  logger.log("Uppercasing", event.params.documentId, original);

  const uppercase = original.toUpperCase();

  // You must return a Promise when performing
  // asynchronous tasks inside a function
  // such as writing to Firestore.
  // Setting an 'uppercase' field in Firestore document returns a Promise.
  return event.data.ref.set({ uppercase }, { merge: true });
});

const crypto = require("crypto");

const privateKey = fs.readFileSync("private_key.pem", "utf-8");
const publicKey = fs.readFileSync("../public_key.pem", "utf-8");

exports.generateSignature = onRequest(async (req, res) => {
  const dataToSign = "tokenDataToBeAddedHere"; // Example data to be signed

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

    console.log("Generated Token:", token);

    // Verify the signature
    const verify = crypto.createVerify("SHA256");
    verify.update(token.data); // Use token.data (which is dataToSign)
    verify.end();
    const isValid = verify.verify(publicKey, token.signature, "base64");

    console.log("Is valid?", isValid);

    if (!isValid) {
      throw new Error("Token verification failed");
    }

    const writeResult = await getFirestore()
      .collection("tokens")
      .add({ token: token });

    // Send back a message that we've successfully written the message
    res.json({
      result: `Message with ID: ${writeResult.id} added.`,
      token: token,
      isValid: isValid,
    });
  } catch (error) {
    console.error("Error signing or verifying the token:", error);
    res.status(500).json({ error: "Failed to generate or verify token" });
  }
});

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
