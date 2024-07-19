import Store from "./services/Store.js";
import Timelines from "./services/Timelines.js";
import EncryptionAPI from "./services/EncryptionAPI";
import { gsap } from "gsap";
import { db } from "./firebase";

import { collection, addDoc } from "firebase/firestore";

// To work with the DOM we wait for this event before we manipulate
window.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".step-img img");

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

  // Fix scrollbar on scroll
  document.addEventListener("scroll", function () {
    const mainNav = document.getElementById("mainNav");
    if (window.scrollY > 0) {
      mainNav.classList.add("scrolled");
      Timelines.statShaLoop.play();
      Timelines.statIterationLoop.play();
      Timelines.statCountLoop.play();
    } else {
      mainNav.classList.remove("scrolled");
    }
  });

  gsap.set(
    [
      "#close-svg",
      "#close-exp-svg",
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
      "#download-btn",
      "#done-svg",
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
    Timelines.showConfirmPassword.restart();
    currentStep = "CONFIRM";
  });

  $("#confirm-password-input").on(
    "input",
    debounce((event) => {
      const inputValue = event.target.value;
      const passwordLength = passwordToConfirm.length;

      console.log(
        "inputValue",
        inputValue,
        "passwordToConfirm",
        passwordToConfirm
      );
      console.log("length", passwordLength);

      if (
        passwordLength !== inputValue.length &&
        !secureCompare(inputValue, passwordToConfirm)
      ) {
        Timelines.passwordsNoMatch.restart();
        Timelines.passwordsNoMatch.play();
      } else {
        if (secureCompare(inputValue, passwordToConfirm)) {
          if (encryptionMode === "DECRYPT_FILE") {
            Timelines.showDecryptionDownload.play();
          } else {
            // console.log("Go to encrypt");
            Timelines.showEncryptBtn.restart();
            currentStep = "ENCRYPT";
          }
        }
      }
    }, 300)
  ); // Adjust debounce time as needed

  $("#encrypt-btn").on("click", () => {
    Timelines.startEncryption.restart();
    Timelines.startEncryptionLabels.restart();
    runRandomOutcome();
    currentStep = "ENCRYPTING";
  });

  $("#download-btn").on("click", () => {
    if (encryptionMode === "DECRYPT_FILE") {
      processDecryptFile(uploadedFile, passwordToConfirm);
    } else {
      processFile(uploadedFile, passwordToConfirm);
    }
  });

  $("#close-exp-svg").addEventListener("click", () => {
    clearUserInputs();
    resetState();

    Timelines.closeExperience.restart().then(() => {
      Timelines.fileLoop.play();
    });
  });

  function handleSubmit(e) {
    e.preventDefault();

    const subject = $("#subject-input").value;
    const email = $("#email-input").value;
    const phone = $("#telephone-input").value;
    const mssg = $("#message-input").value;

    addFeedback(subject, email, phone, mssg);

    // Remove the event listener after the first submission
    $("#contact-form").removeEventListener("submit", handleSubmit);
  }

  $("#contact-form").on("submit", handleSubmit);

  async function addFeedback(subject, email, phone, mssg) {
    try {
      const docRef = await addDoc(collection(db, "feedback"), {
        subject: subject,
        email: email,
        phone: phone,
        mssg: mssg,
        userId: currentUser?.id || "guest",
        timestamp: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      Timelines.feedbackSubmitted.play();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  $("#open-terms").on("click", (e) => {
    e.preventDefault();
    scrollToTop();
    Timelines.openTermsPanel.play();
  });

  $("#close-terms").on("click", (e) => {
    e.preventDefault();
    Timelines.openTermsPanel.reverse();
  });

  $("#open-about").on("click", (e) => {
    e.preventDefault();
    scrollToTop();
    Timelines.openAboutPanel.play();
  });

  $("#close-about").on("click", (e) => {
    e.preventDefault();
    Timelines.openAboutPanel.reverse();
  });

  $("#open-contact").on("click", (e) => {
    e.preventDefault();
    scrollToTop();
    Timelines.openContactPanel.play();
  });

  $("#close-contact").on("click", (e) => {
    e.preventDefault();
    Timelines.openContactPanel.reverse();
  });

  $("#open-privacy").on("click", (e) => {
    e.preventDefault();
    scrollToTop();
    Timelines.openPrivacyPanel.play();
  });

  $("#close-privacy").on("click", (e) => {
    e.preventDefault();
    Timelines.openPrivacyPanel.reverse();
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

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change to 'auto' if you don't want a smooth scroll
    });
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // Constant-time comparison function to prevent timing attacks
  function secureCompare(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  }

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

        const { mimeType, fileName } = getFileDetails(uploadedFile);

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
    resetState();

    // File upload value/input
    clearUserInputs();
    Timelines.fileWasUploaded.reverse().then(() => {
      gsap.delayedCall(2, () => {
        Timelines.fileLoop.resume();
      });
    });
  }

  function resetState() {
    passwordToConfirm = "";
    uploadedFile = null;
    currentStep = "INIT";
  }

  function clearUserInputs() {
    $("#password-input").value = "";
    $("#confirm-password-input").value = "";
    $("#file-upload-input").value = "";
    $("#file-name-display").textContent = "";
  }

  function getCurrentPasswordInput() {
    let input = $("#password-input");
    passwordToConfirm = input.value;
  }

  function runRandomOutcome() {
    // currently set to always encrypt but handy place to show FAIL or test Fail
    setTimeout(() => {
      let result = Math.random() >= 0.5;
      Timelines.startEncryptionLabels.pause();
      if (result) {
        currentStep = "ENCRYPTED";
        Timelines.encryptionSuccess.restart().play();
      } else {
        currentStep = "ENCRYPTED";
        Timelines.encryptionSuccess.restart().play();

        // currentStep = "FAIL";
        // Timelines.encryptionFail.play();
      }
    }, 3200);
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
});
