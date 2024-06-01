import Store from "./services/Store.js";
import Timelines from "./services/Timelines.js";
import EncryptionAPI from "./services/EncryptionAPI";
import { gsap } from "gsap";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

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

  // Module Globals
  let currentUser = null;
  let passwordToConfirm = "";
  let uploadedFile = null;
  let currentStep = "INIT";
  let encryptionMode = "ENCRYPT_FILE";

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      currentUser = user.email;
      Timelines.userLoggedIn.restart();
      $("#user-email").textContent = `Welcome, ${currentUser}`;
    } else {
      console.log("no user signed in");
      $("#user-email").textContent = ``;
      Timelines.userLoggedOut.restart();
    }
  });

  gsap.set(
    [
      "#sign-out-btn",
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
      ".privacy-container",
    ],
    {
      opacity: 0,
      visibility: "hidden",
    }
  );
  Timelines.logoLoop.play();
  Timelines.fileLoop.play();

  $("#check").on("change", function () {
    if (this.checked) {
      encryptionMode = "DECRYPT_FILE";
      Timelines.modeSwitchToggle.play();
    } else {
      encryptionMode = "ENCRYPT_FILE";
      Timelines.modeSwitchToggle.reverse();
    }
  });

  $("#file-upload-input").on("change", handleFileUpload);

  $("#password-btn").on("click", (e) => {
    e.preventDefault();
    getCurrentPasswordInput();
    Timelines.showConfirmPassword.play();
    currentStep = "CONFIRM";
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
        if (encryptionMode === "DECRYPT_FILE") {
          processDecryptFile(uploadedFile, passwordToConfirm);
        } else {
          Timelines.showEncryptBtn.play();
          currentStep = "ENCRYPT";
        }
      }
    }
  });

  $("#encrypt-btn").on("click", (event) => {
    Timelines.startEncryption.play();
    Timelines.startEncryptionLabels.play();
    runRandomOutcome();
    currentStep = "ENCRYPTING";
  });

  $("#open-login").on("click", (e) => {
    e.preventDefault();
    Timelines.openLoginPanel.play();
  });

  $("#login-form").on("submit", (e) => {
    e.preventDefault();

    const email = $("#login-email-input").value;
    const password = $("#login-password-input").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
        Timelines.openLoginPanel.reverse();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
      });
  });

  $("#close-login").on("click", (e) => {
    e.preventDefault();
    Timelines.openLoginPanel.reverse();
  });

  $("#open-sign-up").on("click", (e) => {
    e.preventDefault();
    Timelines.openSignUpPanel.play();
    Timelines.openLoginPanel.reverse();
  });

  $("#sign-up-form").on("submit", (e) => {
    e.preventDefault();

    const email = $("#sign-up-email-input").value;
    const password = $("#sign-up-password-input").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);

        fetch("http://127.0.0.1:5002/ordo-one/us-central1/addOnSignUpTokens", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: { uid: user.uid } }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
      });
  });

  $("#close-sign-up").on("click", (e) => {
    e.preventDefault();
    Timelines.openSignUpPanel.reverse();
  });

  $("#open-terms-from-register").on("click", (e) => {
    e.preventDefault();
    Timelines.openTermsPanel.play();
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

  $("#open-privacy").on("click", (e) => {
    e.preventDefault();
    Timelines.openPrivacyPanel.play();
  });

  $("#close-privacy").on("click", (e) => {
    e.preventDefault();
    Timelines.openPrivacyPanel.reverse();
  });

  $("#sign-out-btn").on("click", (e) => {
    e.preventDefault();
    auth.signOut();
  });

  // can't use "on" use addEventListener on svg element
  $("#back-svg-icon").addEventListener("click", function (e) {
    e.preventDefault();
    if (currentStep === "CONFIRM") {
      console.log("NEXT STEP", "PASSWORD");
      Timelines.showConfirmPassword.reverse().then(() => {
        currentStep = "PASSWORD";
        $("#confirm-password-input").value = "";
      });
    } else if (currentStep === "ENCRYPT") {
      currentStep = "CONFIRM";
      Timelines.showEncryptBtn.reverse();
    } else {
      reverseFileUpload();
    }
  });

  function downloadBase64AsFile(base64String, fileName, mimeType, extension) {
    // Create a Blob from the base64 string
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.${extension}`;

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      console.log(`File chosen: ${file.name}`);
      uploadedFile = file; // Store the file temporarily
      $("#file-name-display").textContent = file.name;
      Timelines.fileLoop.pause();
      Timelines.fileWasUploaded.restart().play();
      currentStep = "PASSWORD";
    }
  }

  async function processFile(file, password) {
    const reader = new FileReader();
    const { mimeType, fileName, fileExtension } = getFileDetails(file);

    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      try {
        const base64String = await EncryptionAPI.encryptFileData(
          arrayBuffer,
          password
        );

        downloadBase64AsFile(
          base64String,
          `${fileName}_encrypted`,
          mimeType,
          fileExtension
        );
      } catch (error) {
        console.error("Encryption failed:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  async function processDecryptFile(uploadedFile, password) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64String = event.target.result.split(",")[1]; // Extract base64 content
      try {
        const decryptedContents = await EncryptionAPI.decryptFileData(
          base64String,
          password
        );

        const { mimeType, fileName } = getFileDetails(file);

        EncryptionAPI.downloadDecryptedFile(
          decryptedContents,
          fileName,
          mimeType
        );
      } catch (error) {
        console.error("Error decrypting file:", error);
      }
    };
    reader.readAsDataURL(uploadedFile);
  }

  function reverseFileUpload() {
    // Init State
    passwordToConfirm = "";
    uploadedFile = null;
    console.log("NEXT STEP", "INIT");
    currentStep = "INIT";

    // File upload value/input
    $("#password-input").value = "";
    $("#file-upload-input").value = "";
    $("#file-name-display").textContent = "";
    Timelines.fileWasUploaded.reverse().then(() => {
      gsap.delayedCall(2, () => {
        Timelines.fileLoop.resume();
      });
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

  function runRandomOutcome() {
    setTimeout(() => {
      let result = Math.random() >= 0.5;
      Timelines.startEncryptionLabels.pause();
      if (result) {
        currentStep = "ENCRYPTED";
        processFile(uploadedFile, passwordToConfirm);
        Timelines.encryptionSuccess.play();
      } else {
        currentStep = "ENCRYPTED";
        processFile(uploadedFile, passwordToConfirm);
        Timelines.encryptionSuccess.play();

        // currentStep = "FAIL";
        // Timelines.encryptionFail.play();
      }
    }, 12000);
  }

  function getFileDetails(file) {
    if (!file) {
      throw new Error("No file provided");
    }

    const mimeType = file.type;
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop();

    return {
      mimeType,
      fileName,
      fileExtension,
    };
  }

  const token = {
    data: "tokenDataToBeAddedHere",
    signature:
      "tlX0OLcUUVHhLnfG1y2nFPHpung9dyNVyg7y9k39TfN6qboIx5exunCfyHtCshAOzf+pR0oRgJqNKHwo+CgcKzAGy5BN+zEssMGjGf3BEUxxZ63GXVyMVkcupT5u1aqnKIoqX50HvRHXSeteS0vVxODEsAJO6rv/SKHkXFN183mJOhzf3kAUyF9fgtippS4TA7keeA2ja4tDOCNaAaPkT2ERG9Aoaa2StHTndjMjn7XCj4TusIeRaS6xsxD65tuPb2DybU5sAz8H7orPZaM6y94ZY9QJiQUvN/toCqug5JoelLabFYnpa/g1UBx2XzY3DSbTk+mrNCUMweiGR30ZJA==", // The base64 signature from the server
  };

  EncryptionAPI.verifyToken(token);
});
