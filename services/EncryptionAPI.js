const EncryptionAPI = {
  toBase64: (uint8Array) => {
    // Convert Uint8Array to a binary string
    let binaryString = "";
    for (let byte of uint8Array) {
      binaryString += String.fromCharCode(byte);
    }

    // Convert binary string to Base64
    return btoa(binaryString);
  },
  base64ToUint8Array: (base64) => {
    // Convert base64 string to binary string
    let binaryString = atob(base64);

    // Convert binary string to Uint8Array
    let len = binaryString.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  },
  encryptFileData: (dataToEncrypt, password) => {
    const encoder = new TextEncoder();
    // =========================================
    // STEP 1 Convert Password and Data to Bytes
    // =========================================
    const dataAsBytes = new Uint8Array(dataToEncrypt);
    const passwordAsBytes = encoder.encode(password); // returns Unit8Array

    // ====================================================
    // Step 2 import Key used to derive our key later,
    //        we can't extract bytes used to deriveKey
    // it takes as input a key in an external, portable format and gives you a CryptoKey
    // ====================================================
    return window.crypto.subtle
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
        const encryptedPackage = EncryptionAPI.concat(salt, iv, encryptedBytes);
        const base64String = EncryptionAPI.toBase64(encryptedPackage);
        console.log("base64String:", base64String);
        // Returning base64String for testing decryption
        return base64String;
      })
      .catch((error) => {
        console.error("Encryption failed:", error);
      });
  },
  decryptFileData: (encryptedPackage, password) => {
    const encoder = new TextEncoder();
    const encryptedBytes = EncryptionAPI.base64ToUint8Array(encryptedPackage);
    const passwordAsBytes = encoder.encode(password);
    const salt = encryptedBytes.slice(0, 32);
    const iv = encryptedBytes.slice(32, 44); // 12 bytes
    const dataAsBytes = encryptedBytes.slice(44);

    return window.crypto.subtle
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
        console.log("File decrypted and ready for download");

        return decryptedBytes;
        // EncryptionAPI.downloadDecryptedFile(
        //   decryptedBytes,
        //   "aa",
        //   "application/pdf"
        // );
      })
      .catch((error) => {
        console.error("Decryption failed:", error);
      });
  },
  concat: (...arrays) => {
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
  },
  fetchPublicKey: () => {
    // const response = await fetch("/public_key.pem");
    // const publicKeyPem = await response.text();
    let pk = `
  -----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0mu6+hal1bhSAzvQ47QY
FedIY0z2UCbQ00DRyon5WqPnpQep7xepx7M3T8mVpZ9Y3THO7YOYNNrG9odyuoMQ
TpNbMxkf2dtXyIq2Ri2qQUa4MjgAFvBG0clKNcezZGLs2sKXGOnlFXEBTy1UkZdJ
9/ctl8Ms4wZb47EbjvRazpJnFN73K7kBfGCHjP5flh32baN55ojwWrec4gnB6+G+
n97mME+8lYNmpyY2sFz5VGPn64EkYrOU0mAyOkK+kz9Fu1ImGWDn5ZWU2qsOBnKr
vxYSWfPTUe64k+4cL4hpdQO7EcFomI2YkdRCKFD4xhjWYG2/wob8mTlopKnwkHXL
0QIDAQAB
-----END PUBLIC KEY-----
  `;
    return pk;
  },
  pemToArrayBuffer: (pem) => {
    const b64 = pem
      .replace(/-----BEGIN PUBLIC KEY-----/, "")
      .replace(/-----END PUBLIC KEY-----/, "")
      .replace(/\n/g, "");
    const binaryDer = atob(b64);
    const buffer = new ArrayBuffer(binaryDer.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binaryDer.length; i++) {
      view[i] = binaryDer.charCodeAt(i);
    }
    return buffer;
  },
  importPublicKey: async (pemKey) => {
    const binaryDer = EncryptionAPI.pemToArrayBuffer(pemKey);
    return crypto.subtle.importKey(
      "spki",
      binaryDer,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" },
      },
      true,
      ["verify"]
    );
  },
  verifySignature: async (publicKey, data, signature) => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const signatureBuffer = Uint8Array.from(atob(signature), (c) =>
      c.charCodeAt(0)
    );

    return crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      publicKey,
      signatureBuffer,
      dataBuffer
    );
  },
  verifyToken: async (token) => {
    try {
      const publicKeyPem = await EncryptionAPI.fetchPublicKey();
      const publicKey = await EncryptionAPI.importPublicKey(publicKeyPem);
      const isValid = await EncryptionAPI.verifySignature(
        publicKey,
        token.data,
        token.signature
      );
      console.log(`Token is ${isValid ? "valid" : "invalid"}`);
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  },
  downloadDecryptedFile: (data, fileName, mimeType) => {
    const blob = new Blob([data], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

export default EncryptionAPI;
