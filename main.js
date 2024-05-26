import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Timelines from "./services/Timelines";
import EncryptionAPI from "./services/EncryptionAPI";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

// const formSignUp = document.getElementById("sign-up-form");
// formSignUp.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const email = document.getElementById("emailSignUp").value;
//   const password = document.getElementById("passwordSignUp").value;

//   console.log("Email:", email);
//   console.log("Password:", password);
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       console.log("user", user);
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(error);
//       // ..
//     });
// });

// const formSignIn = document.getElementById("logInForm");
// formSignIn.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const email = document.getElementById("emailLogin").value;
//   const password = document.getElementById("passwordLogin").value;

//   console.log("Email:", email);
//   console.log("Password:", password);
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       console.log("user", user);
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(error);
//       // ..
//     });
// });

// document.querySelector("#close-svg").addEventListener("click", function (e) {
//   console.log("Close");
//   e.preventDefault();
//   decrypt(
//     "4ObslYvdDr2J/v4VPciDPAwcj0UHtC92vmIGF6cJtdhTxWxl9xLMVNTfXftY2dY86UgZf+txXubwm2y3STXk1RRn3FEW1RpA",
//     "myPassword"
//   );

//   decryptFileData(
//     ,
//     "myPassword"
//   );
//   fileWasUploaded.reverse();
//   document.getElementById("file-name-display").textContent = "";
//   document.getElementById("welcome-header").textContent = "Ordo";
//   document.getElementById("welcome-mssg").textContent =
//     "Choose a file to Encrypt | Decrypt";
// });

const token = {
  data: "tokenDataToBeAddedHere",
  signature:
    "tlX0OLcUUVHhLnfG1y2nFPHpung9dyNVyg7y9k39TfN6qboIx5exunCfyHtCshAOzf+pR0oRgJqNKHwo+CgcKzAGy5BN+zEssMGjGf3BEUxxZ63GXVyMVkcupT5u1aqnKIoqX50HvRHXSeteS0vVxODEsAJO6rv/SKHkXFN183mJOhzf3kAUyF9fgtippS4TA7keeA2ja4tDOCNaAaPkT2ERG9Aoaa2StHTndjMjn7XCj4TusIeRaS6xsxD65tuPb2DybU5sAz8H7orPZaM6y94ZY9QJiQUvN/toCqug5JoelLabFYnpa/g1UBx2XzY3DSbTk+mrNCUMweiGR30ZJA==", // The base64 signature from the server
};

EncryptionAPI.verifyToken(token);

// const themeCheckbox = document.querySelector("#theme-box");
// themeCheckbox.addEventListener("change", toggleColorTheme);

// function toggleColorTheme(e) {
//   if (themeCheckbox.checked === false) {
//     colortest.style.setProperty("--dark-theme", "false");
//   } else {
//     colortest.style.setProperty("--dark-theme", true);
//   }
// }
