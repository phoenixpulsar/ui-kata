import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

const Timelines = {
  logoLoop: (() => {
    let tl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });

    tl.add("begin");
    tl.fromTo(
      "#logo",
      {
        text: "Ordo One",
        duration: 4,
      },
      {
        text: "0100110",
      },
      "begin+=4"
    )
      .to("#logo", {
        duration: 1,
        text: "00101000",
      })
      .to("#logo", {
        duration: 1,
        text: "10010101",
      });

    tl.timeScale(1);

    return tl;
  })(),
  fileLoop: (() => {
    let tl = gsap.timeline({ paused: false, repeat: -1, yoyo: true });

    tl.from("#file-upload-svg-icon", {
      y: 20,
      duration: 1,
    });

    tl.timeScale(1);

    return tl;
  })(),
  fileWasUploaded: (() => {
    var tl = gsap.timeline({ paused: true });
    let passwordInput = document.querySelector("#password-input");

    tl.add("begin");

    tl.to("#welcome-mssg", { opacity: 0 })
      .to("#file-upload-label", { opacity: 0 })
      .to("#file-upload", { opacity: 0 })
      .to(
        "#file-name-display",
        {
          y: 90,
          opacity: 1,
          visibility: "visible",
          duration: 1,
          ease: "sine.out",
        },
        "begin"
      )
      .to(
        "#file-upload-svg-icon",
        {
          y: -75,
          scale: 1.8,
          duration: 1,
        },
        "begin"
      )
      .to(
        "#back-svg-icon",
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
          onComplete: () => {
            passwordInput.focus();
          },
        },
        "begin+=1"
      );

    tl.timeScale(1.5);

    return tl;
  })(),
  showConfirmPassword: (() => {
    var tl = gsap.timeline({ paused: true });
    let confirmPasswordInput = document.querySelector(
      "#confirm-password-input"
    );

    tl.add("begin");

    tl.to(
      "#password-form-step-1",
      { opacity: 0, visibility: "hidden", display: "none" },
      "begin"
    )
      .to("#password-input", { opacity: 0, visibility: "hidden" }, "begin")
      .to("#password-btn", { opacity: 0, visibility: "hidden" }, "begin")
      .to("#confirm-password-label", { opacity: 1, visibility: "visible" })
      .to("#confirm-password-input", {
        opacity: 1,
        visibility: "visible",
        onComplete: () => {
          confirmPasswordInput.focus();
        },
      });

    tl.timeScale(1.5);

    return tl;
  })(),
  passwordsNoMatch: (() => {
    let tl = gsap.timeline({ paused: true });

    tl.to("#password-mismatch-mssg", {
      opacity: 1,
      visibility: "visible",
      duration: 1,
      ease: "sine.out",
      color: "red",
    });
    return tl;
  })(),
  showEncryptBtn: (() => {
    var tl = gsap.timeline({ paused: true });
    let encryptBtn = document.querySelector("#encrypt-btn");

    tl.add("begin");
    tl.to(
      "#password-form-step-1",
      {
        opacity: 0,
        visibility: "hidden",
        duration: 0.5,
        display: "none",
        ease: "sine.out",
      },
      "begin"
    )
      .to(
        "#confirm-password-label",
        {
          opacity: 0,
          visibility: "hidden",
          duration: 0.5,
          display: "none",
          ease: "sine.out",
        },
        "begin"
      )
      .to(
        "#confirm-password-input",
        {
          opacity: 0,
          visibility: "hidden",
          duration: 0.5,
          display: "none",
          ease: "sine.out",
        },
        "begin"
      )
      .fromTo(
        "#top-bulls",
        { y: -60, duration: 1, opacity: 0, visibility: "hidden" },
        {
          y: -20,
          opacity: 1,
          visibility: "visible",
          display: "block",
          ease: "sine.out",
        },
        "begin+=0.5"
      )
      .fromTo(
        "#btm-bulls",
        { y: 60, duration: 1, opacity: 0, visibility: "hidden" },
        {
          y: -20,
          opacity: 1,
          visibility: "visible",
          display: "block",
          ease: "sine.out",
        },
        "begin+=0.5"
      )
      .to(
        "#top-bulls",
        {
          opacity: 0,
          visibility: "hidden",
          duration: 0.5,
          display: "none",
          ease: "sine.out",
        },
        "begin+=1.5"
      )
      .to(
        "#btm-bulls",
        {
          text: "Password Symmetry",
          duration: 1,
          ease: "sine.out",
        },
        "begin+=1.5"
      )
      .to(
        "#btm-bulls",
        {
          opacity: 0,
          visibility: "hidden",
          duration: 1,
          ease: "sine.out",
        },
        "begin+=3.5"
      )
      .to(
        "#encrypt-btn",
        {
          opacity: 1,
          duration: 1,
          visibility: "visible",
          ease: "sine.out",
          onComplete: () => {
            encryptBtn.focus();
          },
        },
        "begin+=1"
      );

    tl.timeScale(1);

    return tl;
  })(),
  openLoginPanel: (() => {
    let tl = gsap.timeline({ paused: true });

    tl.fromTo(
      ".login-container",
      {
        opacity: 0,
        visibility: "hidden",
      },
      {
        opacity: 1,
        visibility: "visible",
        x: "-90vw",
        ease: "sine.out",
        duration: 1,
      }
    );

    tl.timeScale(1.5);

    return tl;
  })(),
  openSignUpPanel: (() => {
    let tl = gsap.timeline({ paused: true });

    tl.fromTo(
      ".sign-up-container",
      {
        opacity: 0,
        visibility: "hidden",
      },
      {
        opacity: 1,
        visibility: "visible",
        x: "-90vw",
        ease: "sine.out",
        duration: 1,
      }
    );

    tl.timeScale(1.5);

    return tl;
  })(),
  openTermsPanel: (() => {
    let tl = gsap.timeline({ paused: true });

    tl.fromTo(
      ".terms-container",
      {
        opacity: 0,
        visibility: "hidden",
      },
      {
        opacity: 1,
        visibility: "visible",
        x: "-90vw",
        ease: "sine.out",
        duration: 1,
      }
    );

    tl.timeScale(1.5);

    return tl;
  })(),
  openAboutPanel: (() => {
    let tl = gsap.timeline({ paused: true });

    tl.fromTo(
      ".about-container",
      {
        opacity: 0,
        visibility: "hidden",
      },
      {
        opacity: 1,
        visibility: "visible",
        x: "-90vw",
        ease: "sine.out",
        duration: 1,
      }
    );

    tl.timeScale(1.5);

    return tl;
  })(),
  openContactPanel: (() => {
    let tl = gsap.timeline({ paused: true });

    tl.fromTo(
      ".contact-container",
      {
        opacity: 0,
        visibility: "hidden",
      },
      {
        opacity: 1,
        visibility: "visible",
        x: "-90vw",
        ease: "sine.out",
        duration: 1,
      }
    );

    tl.timeScale(1.5);

    return tl;
  })(),
  startEncryptionLabels: (() => {
    let tl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });

    tl.add("begin");
    tl.to(
      "#file-name-display",
      {
        text: "0111000",
        duration: 1,
      },
      "begin+=1.5"
    )
      .to(
        "#file-name-display",
        {
          duration: 1,
          text: "00101000",
        },
        "begin+=1"
      )
      .to(
        "#file-name-display",
        {
          duration: 1,
          text: "10010101",
        },
        "begin+=1"
      );

    tl.timeScale(1);

    return tl;
  })(),
  encryptionAnimation: (() => {
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
        "#encrypt-label",
        {
          opacity: 0,
        },
        "start-encrypt"
      )
      .to(
        "#encrypt-btn",
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
  })(),
  startEncryption: (() => {
    var tl = gsap.timeline({ paused: true });

    tl.add("begin");
    tl.to(
      "#back-svg-icon",
      {
        opacity: 0,
        visibility: "hidden",
      },
      "begin"
    )
      .to(
        "#encrypt-btn",
        {
          opacity: 0,
          visibility: "hidden",
        },
        "begin"
      )
      .to(
        "#file-name-display",
        {
          y: 180,
          duration: 0.5,
          ease: "sine.out",
        },
        "begin"
      )
      .to(
        "#file-upload-svg-icon",
        {
          opacity: 0,
          visibility: "hidden",
        },
        "begin=+0.5"
      )
      .to(
        "#empty-shield-svg",
        {
          duration: 1,
          scale: 1.8,
          opacity: 1,
          visibility: "visible",
        },
        "begin=+0.5"
      );
    tl.timeScale(1.1);
    return tl;
  })(),
};

export default Timelines;
