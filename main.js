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
    encryptData("mySecretData", "myPassword");
    const file = event.target.files[0];
    if (file) {
      console.log(`File chosen: ${file.name}`);
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
