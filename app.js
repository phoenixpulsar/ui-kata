import Store from "./services/Store.js";
import Timelines from "./services/Timelines.js";
import EncryptionAPI from "./services/EncryptionAPI";
import { gsap } from "gsap";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("user", user, uid);
    // ...
  } else {
    console.log("no user signed in");
    // User is signed out
    // ...
  }
});

// To work with the DOM we wait for this event before we manipulate
window.addEventListener("DOMContentLoaded", () => {
  // Init
  const $ = (selector) => document.querySelector(selector);

  HTMLElement.prototype.on = function (a, b, c) {
    this.addEventListener(a, b, c);
  };

  HTMLElement.prototype.$ = function (s) {
    return this.querySelector(s);
  };

  gsap.set(
    [
      ".experience-bkg",
      "#close-svg",
      ".password-ctrls",
      ".encrypt-complete-dialog",
      ".encrypt-error-dialog",
      ".login-container",
      "#back-svg-icon",
      "#file-name-display",
      "#start-svg",
      "#clock-svg",
      "#lock-svg",
      "#empty-shield-svg",
      "#checkered-shield-svg",
      "#plus-shield-svg",
      "#wait-shield-svg",
      "#exclamation-shield-svg",
      "#healthy-shield-svg",
      "#star-shield-svg",
      "#check-shield-svg",
      "#done-svg",

      ".sign-up-container",
      ".terms-container",
      ".about-container",
      ".contact-container",
    ],
    {
      opacity: 0,
      visibility: "hidden",
    }
  );
  Timelines.logoLoop.play();
  Timelines.fileLoop.play();

  $("#file-upload").on("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`File chosen: ${file.name}`);
      // const reader = new FileReader();
      // reader.onload = function (event) {
      //   const arrayBuffer = event.target.result;
      //   // encryptData(arrayBuffer, "myPassword"); // Encrypt the file content
      //   encryptFileData(
      //     arrayBuffer,
      //     "myPassword",
      //     "resumeEncrypted2",
      //     "application/pdf"
      //   );
      // };
      // reader.readAsArrayBuffer(file);
      document.getElementById("file-name-display").textContent = file.name;

      Timelines.fileLoop.pause();
      Timelines.fileWasUploaded.play();
    }
  });

  $("#open-login").on("click", (e) => {
    e.preventDefault();
    Timelines.openLoginPanel.play();
  });

  $("#close-login").on("click", (e) => {
    e.preventDefault();
    Timelines.openLoginPanel.reverse();
  });

  $("#open-sign-up").on("click", (e) => {
    e.preventDefault();
    Timelines.openSignUpPanel.play();
  });

  $("#close-sign-up").on("click", (e) => {
    e.preventDefault();
    Timelines.openSignUpPanel.reverse();
  });

  $("#open-terms").on("click", (e) => {
    e.preventDefault();
    Timelines.openTermsPanel.play();
  });

  $("#close-terms").on("click", (e) => {
    e.preventDefault();
    Timelines.openTermsPanel.reverse();
  });

  $("#open-about").on("click", (e) => {
    e.preventDefault();
    Timelines.openAboutPanel.play();
  });

  $("#close-about").on("click", (e) => {
    e.preventDefault();
    Timelines.openAboutPanel.reverse();
  });

  $("#open-contact").on("click", (e) => {
    e.preventDefault();
    Timelines.openContactPanel.play();
  });

  $("#close-contact").on("click", (e) => {
    e.preventDefault();
    Timelines.openContactPanel.reverse();
  });

  // can't use "on" on svg element
  $("#back-svg-icon").addEventListener("click", function (e) {
    e.preventDefault();
    reverseFileUpload();
  });

  function reverseFileUpload() {
    $("#file-upload").value = "";
    $("#file-name-display").textContent = "";
    Timelines.fileWasUploaded.reverse();

    gsap.delayedCall(2, () => {
      Timelines.fileLoop.resume();
    });
  }
});
