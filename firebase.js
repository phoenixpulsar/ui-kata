// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log("Init Firebase");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCZi4uqUyuZRhT2feWbUcXAGL5D8CSN6I0",
  authDomain: "ordo-one-app.firebaseapp.com",
  projectId: "ordo-one-app",
  storageBucket: "ordo-one-app.appspot.com",
  messagingSenderId: "447752977644",
  appId: "1:447752977644:web:b2c0a6e1250edc336fb9c9",
  measurementId: "G-43PS4PQP6T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
