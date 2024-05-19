import { gsap } from "gsap";

// gsap.to(".green", { rotation: 360, x: 100, duration: 1 });

// gsap.set(".co-element", {
//   opacity: 0,
//   visibility: "visible",
// });

// gsap.set(".check", {
//   scale: 0,
//   visibility: "visible",
// });

// gsap.set("#close path", {
//   opacity: 0,
// });

// gsap.set("#box", {
//   visibility: "visible",
//   scaleX: 0.19,
//   scaleY: 0,
//   transformOrigin: "50% 90%",
// });

// gsap.set("#corner", {
//   visibility: "visible",
//   perspective: 600,
//   y: -3,
// });

// gsap.set(".dialog-text span", {
//   opacity: 0,
//   y: -7,
//   visibility: "visible",
// });

// gsap.set("#closeback, .boxes, .sent, .message", {
//   opacity: 0,
//   visibility: "visible",
// });

// gsap.set([".contact", "#close path"], {
//   visibility: "visible",
// });

// const targetRevolve = () => {
//   // Create a timeline with infinite repeat
//   const tl = gsap.timeline({
//     repeat: -1,
//   });

//   // First animation: scale up and fade out
//   tl.fromTo(
//     "#target-circles path",
//     { scale: 1, opacity: 0.7 },
//     {
//       scale: 1.5,
//       opacity: 0,
//       transformOrigin: "50% 50%",
//       ease: "expo.inOut",
//       duration: 2.5,
//     }
//   ).to("#target-circles path", {
//     scale: 1,
//     opacity: 0.7,
//     ease: "expo.inOut",
//     duration: 0.75,
//     stagger: 0.2,
//   });

//   // Adjust the timeline speed
//   tl.timeScale(1.7);

//   return tl;
// };
// const targetsTimeline = targetRevolve();

// function sceneOne() {
//   var tl = gsap.timeline({ paused: true });

//   tl.fromTo(
//     "#target-circles",
//     {
//       scale: 1,
//       opacity: 0.8,
//     },
//     {
//       scale: 1.6,
//       opacity: 0,
//       transformOrigin: "50% 50%",
//       ease: "circ.inOut",
//       stagger: 0.08,
//     }
//   )
//     .fromTo(
//       "#marker",
//       {
//         scaleX: 1,
//       },
//       {
//         scaleX: 0.62,
//         transformOrigin: "50% 50%",
//         ease: "sine.in",
//       },
//       0.05
//     )
//     .to(
//       "#box",
//       {
//         scaleY: 0.7,
//         transformOrigin: "50% 120%",
//         ease: "expo.in",
//       },
//       0.05
//     )
//     .to(
//       "#marker",
//       {
//         scaleX: 0.62,
//         transformOrigin: "50% 50%",
//         ease: "sine.in",
//       },
//       1.2
//     )
//     .to(
//       "#box",
//       {
//         scale: 1,
//         y: 90,
//         transformOrigin: "50% 130%",
//         ease: "expo.out",
//       },
//       1
//     )
//     .fromTo(
//       "#close path",
//       {
//         opacity: 0,
//       },
//       {
//         opacity: 1,
//       }
//     )
//     .fromTo(
//       "#corner",
//       {
//         opacity: 0,
//         scale: 1,
//       },
//       {
//         opacity: 1,
//         scale: 1,
//         ease: "sine.out",
//       },
//       1.4
//     )
//     .to(
//       ".dialog-text span",
//       {
//         y: 0,
//         opacity: 1,
//         ease: "sine.out",
//         stagger: 0.11,
//       },
//       1.25
//     )
//     .fromTo(
//       ".contact",
//       {
//         opacity: 0,
//         y: -2,
//       },
//       {
//         opacity: 1,
//         y: 0,
//         ease: "sine.out",
//       },
//       1.9
//     )
//     .fromTo(
//       "#close path",
//       {
//         // drawSVG: "50% 50%"
//       },
//       {
//         // drawSVG: true,
//         ease: "expo.out",
//       },
//       2
//     );

//   tl.timeScale(1.1);

//   return tl;
// }

// const master = sceneOne();

// const markerTouch = document.querySelector(".marker-touch");

// function contact() {
//   // Create a new timeline, paused initially
//   const tl = gsap.timeline({ paused: true });

//   // Chain animations together without labels
//   tl.to(".boxes", { opacity: 1, duration: 0.1 })
//     .to(
//       ".contact",
//       {
//         y: -62,
//         x: 78,
//         lineHeight: "0.5em",
//         ease: "expo.out",
//         duration: 0.5,
//       },
//       0
//     )
//     .to(
//       ".dialog-text span",
//       {
//         opacity: 0,
//         ease: "expo.out",
//         duration: 0.5,
//         stagger: 0.1,
//       },
//       0
//     )
//     .fromTo(
//       ".co-element",
//       {
//         opacity: 0,
//       },
//       {
//         opacity: 1,
//         ease: "circ.out",
//         duration: 0.5,
//       },
//       0
//     );

//   // Set the timeline's time scale
//   tl.timeScale(1.5);

//   return tl;
// }
// // Initialize the contact animation
// const contactboxTimeline = contact();

// function conOut() {
//   var tl = gsap.timeline({ paused: true });

//   tl.to(".boxes", {
//     duration: 0.1,
//     opacity: 0,
//     ease: "expo.in",
//   })
//     .to(".contact", {
//       duration: 0.3,
//       opacity: 0,
//       ease: "expo.in",
//     })
//     .fromTo(
//       "#close path",
//       {},
//       {
//         ease: "expo.out",
//         duration: 1.1,
//       }
//     )
//     .to("#corner", {
//       duration: 0.4,
//       opacity: 0,
//       scale: 1,
//       ease: "sine.out",
//     })
//     .to(".sent", {
//       duration: 0.3,
//       opacity: 0,
//       ease: "sine.out",
//     })
//     .to(close, {
//       duration: 0.4,
//     })
//     .to(".check", {
//       duration: 0.4,
//       scale: 0,
//       transformOrigin: "50% 50%",
//       ease: "sine.out",
//     })
//     .to("label", {
//       duration: 0.4,
//       scale: 1,
//       x: 0,
//       opacity: 1,
//     })
//     .to(
//       ".contact",
//       {
//         duration: 0.1,
//         x: 0,
//         lineHeight: "1",
//       },
//       "+=1"
//     )
//     .to("#box", {
//       duration: 1,
//       scaleY: 0.8,
//       scaleX: 0.19,
//       transformOrigin: "50% 0%",
//       ease: "expo.inOut",
//     })
//     .to(
//       "label",
//       {
//         duration: 0.5,
//         opacity: 1,
//         ease: "sine.in",
//       },
//       "+=1"
//     )
//     .to(
//       ".sub",
//       {
//         duration: 0.5,
//         opacity: 1,
//         ease: "sine.in",
//       },
//       "+=1"
//     )
//     .to(
//       ".inCo",
//       {
//         duration: 0.1,
//         width: "125px",
//         height: "auto",
//         padding: "8px 5px 8px 55px",
//         opacity: 1,
//         x: 0,
//         y: 0,
//         borderRadius: "0",
//       },
//       "+=1"
//     )
//     .to(
//       ".submit",
//       {
//         duration: 0.1,
//         width: "175px",
//         height: "auto",
//         padding: "8px 5px",
//         backgroundColor: "#0083b2",
//         scale: 1,
//         opacity: 1,
//         x: 0,
//         y: 0,
//         borderRadius: "0",
//       },
//       "+=1"
//     )
//     .to(
//       "#box",
//       {
//         duration: 0.75,
//         scaleX: 0.19,
//         scaleY: 0,
//         transformOrigin: "50% 90%",
//         ease: "expo.in",
//       },
//       "+=1"
//     )
//     .to(
//       "#marker",
//       {
//         duration: 0.5,
//         scaleX: 1,
//         transformOrigin: "50% 50%",
//         ease: "sine.in",
//       },
//       "+=1.5"
//     );

//   tl.timeScale(2);

//   return tl;
// }

// var contactOut = conOut();

// function submitted() {
//   const eB = document.querySelector(".inCo"),
//     subM = document.querySelector(".submit");

//   // Create a new timeline, paused initially
//   const tl = gsap.timeline({ paused: true });

//   // Chain animations together
//   // prettier-ignore
//   tl.to("label", { opacity: 0, ease: "sine.in", duration: 0.5 })
//     .to(".sub", { opacity: 0, ease: "sine.in", duration: 0.5 }, 0)
//     .to(".contact", { opacity: 0, ease: "sine.in", duration: 0.5 }, 0)
//     .fromTo(eB, { width: "125px", height: "auto", padding: "8px 5px 8px 55px", opacity: 1, x: 0, borderRadius: "0" },
//             { width: 20, height: 20, padding: 0, opacity: 0.15, x: 60, borderRadius: "1000px", ease: "circ.inOut", duration: 0.05 }, 1)
//     .to(subM, { width: 20, height: 20, padding: 0, opacity: 0.15, x: 60, borderRadius: "1000px", ease: "circ.inOut", duration: 0.05 }, 1)
//     .to(subM, { opacity: 0.8, y: "-=30", ease: "circ.inOut", duration: 0.5 }, 1.5)
//     .to(eB, { opacity: 0.8, y: "+=30", ease: "circ.inOut", duration: 0.5 }, 1.5)
//     .to(subM, { opacity: 0.2, y: "+=30", ease: "circ.inOut", duration: 0.5 }, 2.5)
//     .to(eB, { opacity: 0.2, y: "-=30", ease: "circ.inOut", duration: 0.5 }, 2.5)
//     .to(subM, { opacity: 0.8, y: "-=30", ease: "circ.inOut", duration: 0.5 }, 3.5)
//     .to(eB, { opacity: 0.8, y: "+=30", ease: "circ.inOut", duration: 0.5 }, 3.5)
//     .to(subM, { opacity: 0.8, y: "+=15", ease: "circ.inOut", duration: 0.25 }, 4.5)
//     .to(eB, { opacity: 0.8, y: "-=15", ease: "circ.inOut", duration: 0.25 }, 4.5)
//     .to(subM, { backgroundColor: "#09CA51", transformOrigin: "50% 50%", scale: 1.75, y: "-=70", x: "-=23", ease: "power3.in", duration: 0.5 }, 5.5)
//     .to("#corner", { opacity: 0, scale: 0.9, ease: "circ.in", duration: 0.5 }, 5.5)
//     .to(".email-box", { opacity: 0, ease: "circ.in", duration: 0.02 }, 5.2)
//     .to(eB, { opacity: 1, duration: 0.02 }, 5.5) // makes it prepped for reopening
//     .fromTo(".check", { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, transformOrigin: "50% 50%", ease: "back.out", duration: 0.2 }, 7.1)
//     .to(subM, { scale: 1.25, transformOrigin: "50% 50%", ease: "back.out", duration: 0.05 }, 6.65)
//     .fromTo(".sent", { opacity: 0 }, { opacity: 1, ease: "sine.out", duration: 0.1 }, 5)
//     .fromTo(".sent-main", { opacity: 0 }, { opacity: 1, ease: "sine.out", duration: 0.75 }, 7)
//     .fromTo(".message", { opacity: 0 }, { opacity: 1, ease: "sine.out", duration: 0.75 }, 7.1);

//   // Return the timeline
//   return tl;
// }

// Initialize the submitted animation
// const complete = submitted();

// if (markerTouch) {
//   // Add click event listener to the selected element
//   markerTouch.addEventListener("click", function (event) {
//     event.preventDefault();
//     master.restart();
//     targetsTimeline.pause();
//     this.classList.add("hide"); // 'this' refers to the clicked element
//   });
// }

// document.querySelector(".contact").addEventListener("click", function (e) {
//   e.preventDefault();
//   contactboxTimeline.restart();
//   document.querySelector(".marker-dialog").classList.add("contactOpen");
//   this.classList.add("hide");
//   this.querySelector(".button").classList.add("main");
//   this.querySelector(".button").classList.remove("button");
// });

// document.querySelector(".submit").addEventListener("click", function (e) {
//   e.preventDefault();
//   document
//     .querySelectorAll("input[type=password]")
//     .forEach((input) => (input.value = ""));
//   complete.restart();
// });

// document.querySelector("#close").addEventListener("click", function (e) {
//   e.preventDefault();
//   document.querySelector(".marker-touch").classList.remove("hide");

//   if (
//     document.querySelector(".marker-dialog").classList.contains("contactOpen")
//   ) {
//     document.querySelector(".contact").classList.remove("hide");
//     document.querySelector(".button").classList.remove("main");
//     document.querySelector(".button").classList.add("button");
//     contactOut.restart();
//   } else {
//     master.reverse();
//     master.timeScale(1.8);
//   }

//   targetsTimeline.progress(0);
//   gsap.set("#target-circles", { opacity: 0 });

//   gsap.delayedCall(1.6, function () {
//     targetsTimeline.restart();
//   });

// document.querySelector(".marker-dialog").classList.remove("contactOpen");
//   document
//     .querySelectorAll("input[type=password]")
//     .forEach((input) => (input.value = ""));
// });

gsap.set(
  [
    ".experience-bkg",
    "#close-svg",
    ".password-ctrls",
    ".encrypt-complete-dialog",
    ".encrypt-error-dialog",
  ],
  {
    opacity: 0,
    visibility: "hidden",
  }
);

function sceneOne() {
  var tl = gsap.timeline({ paused: true });

  tl.add("begin");

  tl.to(".file-upload-ctrls", { opacity: 0 })
    .to(
      "#file-name-display",
      {
        y: -140,
        duration: 1,
        ease: "sine.out",
      },
      "begin"
    )
    .to(
      ".experience-bkg",
      {
        opacity: 1,
        visibility: "visible",
        duration: 1,
      },
      "begin+=1"
    )
    .to(
      "#close-svg",
      {
        opacity: 1,
        visibility: "visible",
      },
      "begin+=1"
    )
    .to(
      ".password-ctrls",
      {
        opacity: 1,
        visibility: "visible",
      },
      "begin+=1"
    );

  tl.timeScale(1.5);

  return tl;
}
const fileWasUploaded = sceneOne();

document
  .getElementById("file-upload")
  .addEventListener("change", function (event) {
    console.log("change");
    // encryptData("mySecretData", "myPassword");
    const file = event.target.files[0];
    if (file) {
      console.log(`File chosen: ${file.name}`);

      const reader = new FileReader();

      reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        // encryptData(arrayBuffer, "myPassword"); // Encrypt the file content
        encryptFileData(
          arrayBuffer,
          "myPassword",
          "resumeEncrypted2",
          "application/pdf"
        );
      };

      reader.readAsArrayBuffer(file);

      document.getElementById("file-name-display").textContent = file.name;
      document.getElementById("welcome-header").textContent =
        "Encrypt | Decrypt";
      document.getElementById("welcome-mssg").textContent =
        "Choose a password to encrypt file. Please keep this password secure, losing it will lock this forever";
      fileWasUploaded.restart();
    }
  });

document.querySelector("#close-svg").addEventListener("click", function (e) {
  console.log("Close");
  e.preventDefault();
  decrypt(
    "4ObslYvdDr2J/v4VPciDPAwcj0UHtC92vmIGF6cJtdhTxWxl9xLMVNTfXftY2dY86UgZf+txXubwm2y3STXk1RRn3FEW1RpA",
    "myPassword"
  );

  decryptFileData(
    "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",
    "myPassword"
  );
  fileWasUploaded.reverse();
  document.getElementById("file-name-display").textContent = "";
  document.getElementById("welcome-header").textContent = "Ordo";
  document.getElementById("welcome-mssg").textContent =
    "Choose a file to Encrypt | Decrypt";
});

function encryptionAnimation() {
  var tl = gsap.timeline({ paused: true });

  tl.add("start-encrypt");
  tl.to(
    "#welcome-header",
    {
      opacity: 0,
    },
    "start-encrypt"
  )
    .to(
      "#welcome-mssg",
      {
        opacity: 0,
      },
      "start-encrypt"
    )
    .to(
      ".file-upload-ctrls",
      {
        opacity: 0,
      },
      "start-encrypt"
    )
    .to(
      "#file-name-display",
      {
        opacity: 0,
      },
      "start-encrypt"
    )
    .to(
      "#encrypt-label",
      {
        opacity: 0,
      },
      "start-encrypt"
    )
    .to(
      "#encrypt-btn-span",
      {
        opacity: 0,
      },
      "start-encrypt"
    )
    .to(
      "#encrypt-input",
      {
        width: 20,
        height: 20,
        padding: 0,
        opacity: 0.15,
        borderRadius: "1000px",
        ease: "sine.out",
        duration: 0.5,
      },
      "start-encrypt+=1"
    )
    .to(
      "#encrypt-btn",
      {
        width: 20,
        height: 20,
        padding: 0,
        opacity: 0.15,
        borderRadius: "1000px",
        ease: "sine.out",
        duration: 0.5,
      },
      "start-encrypt+=1"
    )
    .to(
      "#encrypt-btn",
      {
        opacity: 0.8,
        y: "+=30",
        ease: "sine.out",
        duration: 0.5,
      },
      "start-encrypt+=2"
    )
    .to(
      "#encrypt-input",
      {
        opacity: 0.8,
        y: "-=30",
        ease: "sine.out",
        duration: 0.5,
      },
      "start-encrypt+=2"
    )
    .to(
      "#encrypt-btn",
      {
        opacity: 0.8,
        y: "-=30",
        ease: "sine.out",
        duration: 0.5,
      },
      "start-encrypt+=3"
    )
    .to(
      "#encrypt-input",
      {
        opacity: 0.8,
        y: "+=30",
        ease: "sine.out",
        duration: 0.5,
      },
      "start-encrypt+=3"
    )
    .to(
      "#encrypt-btn",
      {
        opacity: 0.8,
        y: "+=30",
        ease: "sine.out",
        duration: 0.5,
      },
      "start-encrypt+=4"
    )
    .to(
      "#encrypt-input",
      {
        opacity: 0.8,
        y: "-=30",
        ease: "sine.out",
        duration: 0.5,
      },
      "start-encrypt+=4"
    )
    .to(
      "#encrypt-btn",
      {
        opacity: 0,
        y: "-=20",
        ease: "sine.out",
        duration: 0.5,
      },
      "start-encrypt+=5"
    )
    .to(
      "#encrypt-input",
      {
        opacity: 0.8,
        y: "+=20",
        ease: "sine.out",
        duration: 0.5,
      },
      "start-encrypt+=5"
    )
    .to("#encrypt-input", {
      backgroundColor: "#09CA51",
      transformOrigin: "50% 50%",
      scale: 1.75,
      y: "-=80",
      ease: "Power3.easeIn",
    })
    .to(".encrypt-complete-dialog", {
      opacity: 1,
      visibility: "visible",
    });

  return tl;
}
const encryptionAnimationTimeline = encryptionAnimation();

document.querySelector("#encrypt-btn").addEventListener("click", function (e) {
  e.preventDefault();
  encryptionAnimationTimeline.restart();
  removePasswordFromInput();
});

function removePasswordFromInput() {
  document
    .querySelectorAll("input[type=password]")
    .forEach((input) => (input.value = ""));
}

const encoder = new TextEncoder(); // convert string into Unit8Array
const decoder = new TextDecoder();
const FILE_NAME_SIZE = 255; // Updated size for filename
const MIME_TYPE_SIZE = 50; // Size for MIME type

function padOrTruncateUint8Array(uint8Array, size) {
  if (uint8Array.length > size) {
    return uint8Array.slice(0, size);
  } else if (uint8Array.length < size) {
    const paddedArray = new Uint8Array(size);
    paddedArray.set(uint8Array);
    return paddedArray;
  }
  return uint8Array;
}

function concat(...arrays) {
  // Calculate total length of all arrays
  let totalLength = arrays.reduce((acc, array) => acc + array.length, 0);

  // Create a new Uint8Array with the total length
  let result = new Uint8Array(totalLength);

  // Concatenate all arrays into the result array
  let offset = 0;
  for (let array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }

  return result;
}

function toBase64(uint8Array) {
  // Convert Uint8Array to a binary string
  let binaryString = "";
  for (let byte of uint8Array) {
    binaryString += String.fromCharCode(byte);
  }

  // Convert binary string to Base64
  return btoa(binaryString);
}

function base64ToUint8Array(base64) {
  // Convert base64 string to binary string
  let binaryString = atob(base64);

  // Convert binary string to Uint8Array
  let len = binaryString.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
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

// "resumeencrypted"
// "application/pdf"
function encryptFileData(secretData, password) {
  // STEP 1 Convert Password and Data to Bytes
  // const dataAsBytes = encoder.encode(secretData); // returns Unit8Array
  const dataAsBytes = new Uint8Array(secretData);
  const passwordAsBytes = encoder.encode(password); // returns Unit8Array
  // const fileNameAsBytes = padOrTruncateUint8Array(
  //   encoder.encode(fileName),
  //   FILE_NAME_SIZE
  // ); // 255
  // const mimeTypeAsBytes = padOrTruncateUint8Array(
  //   encoder.encode(mimeType),
  //   MIME_TYPE_SIZE
  // ); // 50

  // Step 2 import Key used to derive our key later, false we can't extract bytes used to deriveKey
  window.crypto.subtle
    .importKey("raw", passwordAsBytes, "PBKDF2", false, ["deriveKey"])
    .then((passwordKey) => {
      // 256 bit | 32 byte
      // size of the random bytes that you want from 0 to 255 ... Uint8Array(32) [212, 112, 100, 7 ....]
      const salt = window.crypto.getRandomValues(new Uint8Array(32));

      return window.crypto.subtle
        .deriveKey(
          {
            name: "PBKDF2",
            salt,
            iterations: 250000, // how many times we want to hash this thing over and over again,
            hash: { name: "SHA-256" }, // sort of hash we want to use here
          },
          passwordKey,
          { name: "AES-GCM", length: 256 },
          false,
          ["encrypt"]
        )
        .then((aesKey) => ({ aesKey, salt })); // Pass salt along with aesKey
    })
    .then(({ aesKey, salt }) => {
      // aesKey:CryptoKey
      console.log("aes key", aesKey);
      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // initializationVector 96bit - 12bytes
      return window.crypto.subtle
        .encrypt(
          {
            name: "AES-GCM",
            iv,
          },
          aesKey,
          dataAsBytes
        )
        .then((encryptedContent) => ({
          encryptedContent,
          salt,
          iv,
        })); // Pass salt and iv along with encryptedContent
    })
    .then(({ encryptedContent, salt, iv }) => {
      // encryptedContent: ArrayBuffer to view those bytes convert to type array
      const encryptedBytes = new Uint8Array(encryptedContent);

      // Convert it so we can send it through the wire
      // We need to keep track of the salt used to generate it
      // We also need to store the initialization vector
      // We use salt and iv so that repeated encrypted items do not hash to the same value -> prevent brute force
      // We will concat the salt + iv + encrypted data
      // Then we will convert to base64 encoding to convert to a string
      const encryptedPackage = concat(salt, iv, encryptedBytes);
      const base64String = toBase64(encryptedPackage);
      console.log("base64String:", base64String);
      // Returning base64String for testing decryption
      return base64String;
    })
    .catch((error) => {
      console.error("Encryption failed:", error);
    });
}

function decryptFileData(encryptedPackage, password) {
  const encryptedBytes = base64ToUint8Array(encryptedPackage);
  const passwordAsBytes = encoder.encode(password);
  const salt = encryptedBytes.slice(0, 32);
  const iv = encryptedBytes.slice(32, 44); // 12 bytes
  const dataAsBytes = encryptedBytes.slice(44);
  // const fileNameAsBytes = encryptedBytes.slice(44, 44 + FILE_NAME_SIZE);
  // const mimeTypeAsBytes = encryptedBytes.slice(
  //   44 + FILE_NAME_SIZE,
  //   44 + FILE_NAME_SIZE + MIME_TYPE_SIZE
  // );
  // const dataAsBytes = encryptedBytes.slice(
  //   44 + FILE_NAME_SIZE + MIME_TYPE_SIZE
  // );

  // const fileName = decoder.decode(fileNameAsBytes).replace(/\0/g, ""); // Remove padding zeros
  // const mimeType = decoder.decode(mimeTypeAsBytes).replace(/\0/g, ""); // Remove padding zeros

  // console.log("filename", fileName);
  // console.log(mimeType);

  window.crypto.subtle
    .importKey("raw", passwordAsBytes, "PBKDF2", false, ["deriveKey"])
    .then((passwordKey) => {
      return window.crypto.subtle
        .deriveKey(
          {
            name: "PBKDF2",
            salt,
            iterations: 250000, // how many times we want to hash this thing over and over again,
            hash: { name: "SHA-256" }, // sort of hash we want to use here
          },
          passwordKey,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        )
        .then((aesKey) => ({ aesKey, dataAsBytes, iv }));
    })
    .then(({ aesKey, dataAsBytes, iv }) => {
      return window.crypto.subtle
        .decrypt(
          {
            name: "AES-GCM",
            iv,
          },
          aesKey,
          dataAsBytes
        )
        .then((decryptedContent) => ({ decryptedContent }));
    })
    .then(({ decryptedContent }) => {
      const decryptedBytes = new Uint8Array(decryptedContent);
      saveFile(decryptedBytes, "aa", "application/pdf");
      console.log("File decrypted and ready for download");
    })
    .catch((error) => {
      console.error("Decryption failed:", error);
    });
}

function encryptData(secretData, password) {
  // STEP 1 Convert Password and Data to Bytes
  const dataAsBytes = encoder.encode(secretData); // returns Unit8Array
  const passwordAsBytes = encoder.encode(password); // returns Unit8Array
  console.log(dataAsBytes, passwordAsBytes);

  // Step 2 import Key used to derive our key later, false we can't extract bytes used to deriveKey
  window.crypto.subtle
    .importKey("raw", passwordAsBytes, "PBKDF2", false, ["deriveKey"])
    .then((passwordKey) => {
      console.log("passwordKey", passwordKey);

      // 256 bit | 32 byte
      // size of the random bytes that you want from 0 to 255 ... Uint8Array(32) [212, 112, 100, 7 ....]
      const salt = window.crypto.getRandomValues(new Uint8Array(32));

      return window.crypto.subtle
        .deriveKey(
          {
            name: "PBKDF2",
            salt,
            iterations: 250000, // how many times we want to hash this thing over and over again,
            hash: { name: "SHA-256" }, // sort of hash we want to use here
          },
          passwordKey,
          { name: "AES-GCM", length: 256 },
          false,
          ["encrypt"]
        )
        .then((aesKey) => ({ aesKey, salt })); // Pass salt along with aesKey
    })
    .then(({ aesKey, salt }) => {
      // aesKey:CryptoKey
      console.log("aes key", aesKey);
      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // initializationVector 96bit - 12bytes
      return window.crypto.subtle
        .encrypt(
          {
            name: "AES-GCM",
            iv,
          },
          aesKey,
          dataAsBytes
        )
        .then((encryptedContent) => ({ encryptedContent, salt, iv })); // Pass salt and iv along with encryptedContent
    })
    .then(({ encryptedContent, salt, iv }) => {
      // encryptedContent: ArrayBuffer to view those bytes convert to type array
      const encryptedBytes = new Uint8Array(encryptedContent);
      console.log(encryptedBytes);

      // Convert it so we can send it through the wire
      // We need to keep track of the salt used to generate it
      // We also need to store the initialization vector
      // We use salt and iv so that repeated encrypted items do not hash to the same value -> prevent brute force
      // We will concat the salt + iv + encrypted data
      // Then we will convert to base64 encoding to convert to a string
      const encryptedPackage = concat(salt, iv, encryptedBytes);
      const base64String = toBase64(encryptedPackage);
      console.log("base64String", base64String);
    });
}

// encryptedData: string, password: string
function decrypt(encryptedPackage, password) {
  const encryptedBytes = base64ToUint8Array(encryptedPackage);
  const passwordAsBytes = encoder.encode(password);
  const salt = encryptedBytes.slice(0, 32);
  const iv = encryptedBytes.slice(32, 44); // 12 bytes
  const dataAsBytes = encryptedBytes.slice(44);

  window.crypto.subtle
    .importKey("raw", passwordAsBytes, "PBKDF2", false, ["deriveKey"])
    .then((passwordKey) => {
      return window.crypto.subtle
        .deriveKey(
          {
            name: "PBKDF2",
            salt,
            iterations: 250000, // how many times we want to hash this thing over and over again,
            hash: { name: "SHA-256" }, // sort of hash we want to use here
          },
          passwordKey,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        )
        .then((aesKey) => ({ aesKey, dataAsBytes, iv }));
    })
    .then(({ aesKey, dataAsBytes, iv }) => {
      return window.crypto.subtle
        .decrypt(
          {
            name: "AES-GCM",
            iv,
          },
          aesKey,
          dataAsBytes
        )
        .then((decryptedContent) => ({ decryptedContent }));
    })
    .then(({ decryptedContent }) => {
      const decryptedBytes = new Uint8Array(decryptedContent);
      const decryptedString = decoder.decode(decryptedBytes);
      console.log("Decrypted string:", decryptedString);
    });
}

function verifyToken(token) {
  const publicKey = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArukUXt5ZZp6aLTM4qza3
  Gl3PTBh3gAm3TMq5sqrV+hZR6IT8ys3qFaLxAI5fnU2mMUdXmLBNaTj5NsOEnYS2
  9VcTkOMhMe4y2zBFQrQO+oY6xk+dmZaQGVIYJxJLnp3h+7Y6x+rW0cE9dQvpO2HQ
  DM3fUN4pr44CzcCRxH86zn1d5Nh7SQ/r68tSjJCh2PB+yQHl05m0ZwUI5C0nf6U/
  XnrlBUkxzm+v7EkG9NDYSDdrONWA24RRMqK0to2KbwlPBnbV81ram8qCMT0GMkMo
  Gg9KnMesfony/WVl4AqhOPLTCjc0WzeE2Gjoo5myA4+I0pICjuas8Mky8TkH5tQZ
  cQIDAQAB
  -----END PUBLIC KEY-----`;

  const tokenString = JSON.stringify(token.data);
  const signature = token.signature;

  // Verify the token with the public key
  const verify = crypto.createVerify("SHA256");
  verify.update(tokenString);
  verify.end();
  return verify.verify(publicKey, signature, "base64");
}

// document.querySelector(".marker-dialog").classList.remove("contactOpen");
//   document
//     .querySelectorAll("input[type=password]")
//     .forEach((input) => (input.value = ""));
// });

// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// import "./style.scss";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";

// document.querySelector("#app").innerHTML = `
//   <div class="container">
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector("#counter"));
