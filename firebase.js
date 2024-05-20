// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log("Init Firebase");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJpBzUtnaft54owPcdzxxoAdX15YMOrgk",
  authDomain: "ordo-one.firebaseapp.com",
  projectId: "ordo-one",
  storageBucket: "ordo-one.appspot.com",
  messagingSenderId: "913175168226",
  appId: "1:913175168226:web:afd288d5e2ca60a8cb0abb",
  measurementId: "G-9GYS6CHQ0R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
