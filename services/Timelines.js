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
  statShaLoop: (() => {
    let tl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });

    tl.add("begin");
    tl.fromTo(
      "#stat-sha",
      {
        text: "SHA-256",
        duration: 2,
      },
      {
        text: "0100110",
      },
      "begin+=2"
    ).to("#stat-sha", {
      duration: 0.5,
      text: "00101000",
    });

    tl.timeScale(1);

    return tl;
  })(),
  statIterationLoop: (() => {
    let tl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
    tl.add("begin");
    tl.fromTo(
      "#stat-iteration",
      {
        text: "250,000",
        duration: 2,
      },
      {
        text: "0100110",
      },
      "begin+=2"
    ).to("#stat-iteration", {
      duration: 0.5,
      text: "00101000",
    });

    tl.timeScale(1);
    return tl;
  })(),
  statCountLoop: (() => {
    let tl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
    tl.add("begin");
    tl.fromTo(
      "#stat-count",
      {
        text: "1000+",
        duration: 2,
      },
      {
        text: "0100110",
      },
      "begin+=2"
    ).to("#stat-count", {
      duration: 0.5,
      text: "00101000",
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
  feedbackSubmitted: (() => {
    let tl = gsap.timeline({ paused: true });
    tl.add("begin");

    tl.to(
      ".contact-content",
      {
        opacity: 0,
        visibility: "hidden",
        duration: 1,
      },
      "begin"
    )
      .to(".contact-header", {
        y: 40,
      })
      .to(".contact-header", {
        duration: 1,
        text: "0100110101001",
      })
      .to(".contact-header", {
        duration: 1,
        text: "Thank you, message received",
      });

    return tl;
  })(),
  modeSwitchToggle: (() => {
    let tl = gsap.timeline({ paused: true });

    tl.add("begin");
    tl.to(
      "#mode-encrypt",
      {
        color: "#4d5358",
      },
      "begin"
    )
      .to(
        "#mode-decrypt",
        {
          color: "white",
        },
        "begin"
      )
      .to(
        "#mssg-mode",
        {
          text: "010010",
          duration: 0.3,
          ease: "sine.out",
        },
        "begin=-0.1"
      )
      .to(
        "#mssg-mode",
        {
          text: "Decrypt",
          duration: 0.3,
          ease: "sine.out",
        },
        "begin+=0.3"
      );

    return tl;
  })(),
  fileWasUploaded: (() => {
    var tl = gsap.timeline({ paused: true });
    let passwordInput = document.querySelector("#password-input");

    tl.add("begin");
    tl.to("#welcome-mssg", { opacity: 0 })
      .to("#encryption-mode-switch", { opacity: 0 })
      .to("#file-upload-label", { opacity: 0 })
      .to("#file-upload-input", { opacity: 0 })
      .to(
        "#file-name-display",
        {
          y: 150,
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
        { opacity: 1, visibility: "visible", display: "block" },
        "begin+=1"
      )
      .to("#password-input", { opacity: 1, visibility: "visible" }, "begin+=1")
      .to("#password-btn", { opacity: 1, visibility: "visible" }, "begin+=1")
      .to(
        "#password-form-step-1",
        {
          opacity: 1,
          display: "block",
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
      .to("#confirm-password-label", {
        opacity: 1,
        visibility: "visible",
        display: "block",
      })
      .to("#confirm-password-input", {
        opacity: 1,
        visibility: "visible",
        display: "block",
        onComplete: () => {
          confirmPasswordInput.focus();
        },
      });

    tl.timeScale(1.5);

    return tl;
  })(),
  passwordsNoMatch: (() => {
    // let tl = gsap.timeline({ paused: true });

    // tl.to("#password-mismatch-mssg", {
    //   opacity: 1,
    //   visibility: "visible",
    //   duration: 1,
    //   ease: "sine.out",
    //   color: "red",
    // });
    // return tl;
    let tl = gsap.timeline({ paused: true });
    tl.add("begin");

    tl.to(
      ".app-notifications",
      {
        duration: 0.25,
        text: "101010001100",
      },
      "begin"
    )
      .to(".app-notifications", {
        duration: 1,
        text: "Password Mismatch",
      })
      .to(
        ".app-notifications",
        {
          duration: 1,
          text: "00101000",
        },
        "begin+=2"
      )
      .to(".app-notifications", {
        opacity: 0,
        duration: 1,
        text: "",
      });
    return tl;
  })(),
  showDecryptionDownload: (() => {
    var tl = gsap.timeline({ paused: true });
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
        "#back-svg-icon",
        {
          opacity: 0,
          visibility: "hidden",
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
        "#file-name-display",
        {
          opacity: 0,
          visibility: "hidden",
        },
        "begin"
      )
      .to(
        "#file-upload-svg-icon",
        {
          opacity: 0,
          visibility: "hidden",
          scale: 1,
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
      .to("#download-btn", {
        opacity: 1,
        visibility: "visible",
      })
      .to(
        "#close-exp-svg",
        {
          opacity: 1,
          visibility: "visible",
          duration: 1,
          ease: "sine.out",
        },
        "begin=-1"
      );

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
        { y: -120, duration: 1, opacity: 0, visibility: "hidden" },
        {
          y: -90,
          opacity: 1,
          visibility: "visible",
          display: "block",
          ease: "sine.out",
        },
        "begin+=0.5"
      )
      .fromTo(
        "#btm-bulls",
        { y: 120, duration: 1, opacity: 0, visibility: "hidden" },
        {
          y: -90,
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
          y: 0,
          duration: 1,
          display: "block",
          visibility: "visible",
          ease: "sine.out",
          onComplete: () => {
            encryptBtn.focus();
          },
        },
        "begin+=3.5"
      );

    tl.timeScale(1);

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
  openPrivacyPanel: (() => {
    let tl = gsap.timeline({ paused: true });

    tl.fromTo(
      ".privacy-container",
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
        duration: 0,
      },
      "begin=-0.5"
    )
      .to(
        "#file-name-display",
        {
          duration: 1,
          text: "1001010001",
        },
        "begin"
      )
      .to(
        "#file-name-display",
        {
          duration: 1,
          text: "0010100010",
        },
        "begin+=0.5"
      )
      .to(
        "#file-name-display",
        {
          duration: 1,
          text: "00100110110",
        },
        "begin+=1.5"
      )
      .to(
        "#file-name-display",
        {
          duration: 1,
          text: "10010101",
        },
        "begin+=2"
      );

    tl.timeScale(1);

    return tl;
  })(),
  startEncryption: (() => {
    let tl = gsap.timeline({ paused: true });

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
          display: "none",
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
          y: 0,
          scale: 1,
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
  encryptionFail: (() => {
    let tl = gsap.timeline({ paused: true });
    tl.add("begin");
    tl.to("#empty-shield-svg", {
      opacity: 0,
      display: "hidden",
      duration: 1,
      scale: 1,
      ease: "sine.out",
    })
      .to(
        "#exclamation-shield-svg",
        {
          opacity: 1,
          visibility: "visible",
          duration: 1,
          scale: 1.8,
          ease: "sine.out",
        },
        "begin=-1"
      )
      .to("#file-name-display", {
        text: "Error Encrypting File",
        duration: 0.5,
        ease: "sine.out",
      });

    return tl;
  })(),
  closeExperience: (() => {
    let tl = gsap.timeline({ paused: true });
    tl.add("begin");
    tl.to(
      "#file-name-display",
      {
        opacity: 0,
        visibility: "hidden",
        duration: 1,
        scale: 1,
        ease: "sine.out",
      },
      "begin"
    )
      .to(
        "#done-svg",
        {
          opacity: 0,
          visibility: "hidden",
          duration: 1,
          ease: "sine.out",
        },
        "begin"
      )
      .to(
        "#download-btn",
        {
          opacity: 0,
          visibility: "hidden",
          duration: 1,
          ease: "sine.out",
        },
        "begin"
      )
      .to(
        "#close-exp-svg",
        {
          opacity: 0,
          visibility: "hidden",
          duration: 1,
          ease: "sine.out",
        },
        "begin"
      )
      .to(
        ".password-ctrls",
        {
          opacity: 0,
          display: "none",
          visibility: "hidden",
          duration: 1,
          ease: "sine.out",
        },
        "begin"
      )
      .to(
        "#welcome-mssg",
        {
          opacity: 1,
          visibility: "visible",
          duration: 1,

          ease: "sine.out",
        },
        "begin=+1.5"
      )
      .to(
        "#encryption-mode-switch",
        {
          opacity: 1,
          visibility: "visible",
          duration: 1,

          ease: "sine.out",
        },
        "begin=+1.5"
      )
      .to(
        "#file-upload-label",
        {
          opacity: 1,
          visibility: "visible",
          duration: 1,

          ease: "sine.out",
        },
        "begin=+1.5"
      )
      .to(
        "#file-upload-input",
        {
          opacity: 1,
          visibility: "visible",
          duration: 1,

          ease: "sine.out",
        },
        "begin=+1.5"
      )
      .to(
        "#file-upload-svg-icon",
        {
          opacity: 1,
          visibility: "visible",
          duration: 1,

          ease: "sine.out",
        },
        "begin=+1.5"
      );

    return tl;
  })(),
  encryptionSuccess: (() => {
    let tl = gsap.timeline({ paused: true });
    tl.add("begin");
    tl.to("#empty-shield-svg", {
      opacity: 0,
      visibility: "hidden",
      duration: 1,
      scale: 1,
      ease: "sine.out",
    })
      .to(
        "#done-svg",
        {
          opacity: 1,
          visibility: "visible",
          duration: 1,
          scale: 1.8,
          ease: "sine.out",
        },
        "begin=-1"
      )
      .to("#file-name-display", {
        text: "Encrypted",
        duration: 0.5,
        ease: "sine.out",
      })
      .to(
        "#download-btn",
        {
          opacity: 1,
          display: "block",
          visibility: "visible",
          duration: 1,
          ease: "sine.out",
        },
        "begin=-1"
      )
      .to(
        "#close-exp-svg",
        {
          opacity: 1,
          visibility: "visible",
          duration: 1,
          ease: "sine.out",
        },
        "begin=-1"
      );

    return tl;
  })(),
};

export default Timelines;
