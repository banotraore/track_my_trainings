import React, { useState, useEffect } from "react";

import axios from "axios";
const Recaptcha = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}`;
    scriptTag.addEventListener("load", () => setLoaded(true));
    scriptTag.async = true;
    scriptTag.defer = true;
    document.body.appendChild(scriptTag);
  }, []);

  useEffect(() => {
    // if (!loaded) return;

    if (loaded) {
      checkConnexion();
    } else {
      return;
    }
  }, [loaded]);

  function checkConnexion() {
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(`${process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}`, {
          action: "submit",
        })
        .then(function (token) {
          // Send the token to the server and check if the connexion is legit or not.

          axios
            .post("check_captcha", {
              token: token,
            })
            .then((response) => {
              props.setBotDetected(false);
            })
            .catch((error) => {
              console.log(error.response);
              props.setBotDetected(true);
            });
        });
    });
  }

  window.checkConnexion = checkConnexion;
  return <div></div>;
};

export default Recaptcha;
