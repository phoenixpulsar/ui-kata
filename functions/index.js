require("dotenv").config();
const { initializeApp } = require("firebase-admin/app");
const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

const corsHandler = cors({
  origin: ["https://ordo-one-app.web.app", "http://localhost:5173"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
});

const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

// =============================
// Contact
// =============================
exports.contactMssg = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const user = req.body.user || null;
    const mssg = req.body.mssg || null;

    try {
      if (mssg !== null && user !== null) {
        await getFirestore().collection("contact_mssg").doc(user.uid).set({
          mssg: mssg,
        });
      } else {
        if (mssg !== null) {
          await getFirestore().collection("contact_mssg").doc("all").set({
            mssg: mssg,
          });
        }
      }

      res.status(200).json({
        message: `Added mssg`,
      });
    } catch (error) {
      console.error("Error adding mssg", error);
      res.status(500).json({
        error: "Failed to add mssg",
        details: error.message,
      });
    }
  });
});
