import Store from "./services/Store.js";
import Timelines from "./services/Timelines.js";
import EncryptionAPI from "./services/EncryptionAPI";
import { gsap } from "gsap";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

// To work with the DOM we wait for this event before we manipulate
window.addEventListener("DOMContentLoaded", () => {
  const successUrl = "http://localhost:5173/success.html";
  const cancelUrl = "http://localhost:5173/cancel.html";

  function handleNavigation(event) {
    console.log("e navigation");
    // Check if the URL matches the success or cancel URL
    if (window.location.href === successUrl) {
      // Handle success URL navigation
      console.log("User navigated to success page");
      // Add your code to handle success

      // Remove success.html from the URL
      window.history.replaceState({}, document.title, "/");
    } else if (window.location.href === cancelUrl) {
      // Handle cancel URL navigation
      console.log("User navigated to cancel page");
      // Add your code to handle cancel

      // Remove cancel.html from the URL
      window.history.replaceState({}, document.title, "/");
    }
  }

  // Override history.pushState and history.replaceState to trigger custom event
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (state, title, url) {
    const result = originalPushState.apply(this, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
    return result;
  };

  history.replaceState = function (state, title, url) {
    const result = originalReplaceState.apply(this, arguments);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
    return result;
  };

  window.addEventListener("popstate", handleNavigation);
  window.addEventListener("locationchange", handleNavigation);

  // Initial check if already on the target page
  handleNavigation();
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
  let wholeUser = null;
  let passwordToConfirm = "";
  let uploadedFile = null;
  let currentStep = "INIT";
  let encryptionMode = "ENCRYPT_FILE";

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     currentUser = user.email;
  //     Timelines.userLoggedIn.restart();
  //     $("#user-email").textContent = `Welcome, ${currentUser}`;
  //   } else {
  //     console.log("no user signed in");
  //     $("#user-email").textContent = ``;
  //     Timelines.userLoggedOut.restart();
  //   }
  // });

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      wholeUser = user;
      currentUser = user.email;
      Timelines.userLoggedIn.restart();

      try {
        console.log("hereeee");
        const docRef = doc(db, "customer_tokens", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const tokens = docSnap.data().tokens;
          console.log("Tokens:", tokens);
          // You can now use the tokens as needed
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    } else {
      // No user is signed in
      console.log("No user signed in");
      Timelines.userLoggedOut.restart();
    }
  });

  gsap.set(
    [
      "#user-profile",
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
      ".login-container",
      ".profile-container",
      ".checkout-container",
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

  $("#user-profile").on("click", (e) => {
    e.preventDefault();
    Timelines.openProfilePanel.play();
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
        fetch("https://addonsignuptokens-h5q4nbdnia-uc.a.run.app", {
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

  $("#open-checkout").on("click", (e) => {
    console.log("checkout");
    e.preventDefault();
    startStripeSession();

    // Timelines.openCheckoutPanel.play();
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

  $("#close-checkout").on("click", (e) => {
    e.preventDefault();
    Timelines.openCheckoutPanel.reverse();
  });

  $("#sign-out-btn").on("click", (e) => {
    e.preventDefault();
    auth.signOut();
    Timelines.openProfilePanel.reverse();
  });

  $("#close-profile").on("click", (e) => {
    e.preventDefault();
    Timelines.openProfilePanel.reverse();
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

  $("#install-btn").on("click", (e) => {
    e.preventDefault();
    console.log(wholeUser);
    addTokens(wholeUser);
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

  async function testExpressApi() {
    try {
      const response = await fetch("https://ordo-api.vercel.app/yo", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function startStripeSession() {
    try {
      const response = await fetch(
        "https://createcheckout-h5q4nbdnia-uc.a.run.app",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      window.location = data.url;
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function addTokens(user) {
    try {
      const response = await fetch(
        "https://addonsignuptokens-h5q4nbdnia-uc.a.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: { uid: user.uid } }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const token = {
    data: "tokenDataToBeAddedHere",
    signature:
      "tlX0OLcUUVHhLnfG1y2nFPHpung9dyNVyg7y9k39TfN6qboIx5exunCfyHtCshAOzf+pR0oRgJqNKHwo+CgcKzAGy5BN+zEssMGjGf3BEUxxZ63GXVyMVkcupT5u1aqnKIoqX50HvRHXSeteS0vVxODEsAJO6rv/SKHkXFN183mJOhzf3kAUyF9fgtippS4TA7keeA2ja4tDOCNaAaPkT2ERG9Aoaa2StHTndjMjn7XCj4TusIeRaS6xsxD65tuPb2DybU5sAz8H7orPZaM6y94ZY9QJiQUvN/toCqug5JoelLabFYnpa/g1UBx2XzY3DSbTk+mrNCUMweiGR30ZJA==", // The base64 signature from the server
  };

  EncryptionAPI.verifyToken(token);
});
