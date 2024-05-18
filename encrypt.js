// secretData: string, password: string

const encoder = new TextEncoder();
const encodedData = encoder.encode("Your UTF-8 string here");

function encryptData(secretData, password) {
  //   const dataAsBytes = UTF8.encode(secretData);
  const dataAsBytes = encoder.encode(secretData);
  const passwordAsBytes = encoder.encode(password);
  window.crypto.subtle
    .importKey("raw", passwordAsBytes, "PBKDE2", false, ["deriveKey"])
    .then((passwordKey) => {
      console.log("passwordKey", passwordKey);
      // const salt = window.crypto.getRandomValues (new Uint8Array (12));
      // 	return window.crypto.subtle.deriveKey({
      // 	name: 'PBKDF2'
      // 	salt,
      // 	iterations: 250000,
      // 	hash: {name: 'SHA-256'7
      // 	}, passwordKey, {name: 'AES-GCM' length: 256}, false, ['encrypt'1);

      // }).then(CaesKey: CryptoKey) =>{
      // 	const iv = window.crypto.getRandomValues(new Uint8Array (12));
      // 	return window. crypto.subtle. encrypt({
      // 		пате: 'AES-GCM'
      // 		iv,
      // 	}, aesKey, dataAsBytes);
      // }).then((encryptedContent: ArrayBuffer) => {
      // 	const encryptedBytes = new Uint8Array(encryptedContent);
    });
}

let password = "password";
let secretData = "mySecretData";

encryptData(secretData, password);
