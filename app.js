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

  let passwordToConfirm = "";

  gsap.set(
    [
      ".experience-bkg",
      "#close-svg",
      ".password-ctrls",
      "#confirm-password-label",
      "#confirm-password-input",
      "#top-bulls",
      "#bulls-mssg",
      "#btm-bulls",
      "#password-mismatch-mssg",
      "#encrypt-btn",
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

  $("#password-btn").on("click", (e) => {
    e.preventDefault();
    getCurrentPasswordInput();
    Timelines.showConfirmPassword.play();
    // Timelines.startEncryptionLabels.play();
  });

  $("#confirm-password-input").on("input", (event) => {
    if (passwordToConfirm.length !== event.target.value.length) {
      if (passwordToConfirm.startsWith(event.target.value)) {
        Timelines.passwordsNoMatch.reverse();
      } else {
        Timelines.passwordsNoMatch.play();
      }
    } else {
      if (event.target.value === passwordToConfirm) {
        Timelines.showEncryptBtn.play();
      }
    }
  });

  $("#encrypt-btn").on("click", (event) => {
    Timelines.startEncryption.play();
    Timelines.startEncryptionLabels.play();
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

  $("#sign-out-btn").on("click", (e) => {
    e.preventDefault();
    auth.signOut();
  });

  // can't use "on" use addEventListener on svg element
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

  function getCurrentPasswordInput() {
    let input = $("#password-input");
    passwordToConfirm = input.value;
  }

  function removePasswordFromInput() {
    document.querySelectorAll("input[type=password]").forEach((input) => {
      console.log(input.value);
      input.value = "";
    });
  }

  function saveFile(data, fileName, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
