"use strict";

((window, document) => {
  // speech APIs
  const webkitSpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;
  const speechSynthesis = window.speechSynthesis;
  const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
  const getElementById = document.getElementById.bind(document);

  // elements
  const resultTag = getElementById("result");
  const speechStartBtn = getElementById("speech-start");
  const speechStopBtn = getElementById("speech-stop");
  const speechClearBtn = getElementById("speech-clear");
  const readTextBtn = getElementById("read-text");
  let isMikeStarted = false;

  // speech to text
  if (
    webkitSpeechRecognition &&
    typeof webkitSpeechRecognition === "function"
  ) {
    const speechRecognition = new webkitSpeechRecognition();

    const mikeStatus = getElementById("mike-status");

    const stopMike = () => {
      if (isMikeStarted) {
        mikeStatus.innerText = "stopped";
        mikeStatus.classList.add("text-danger");
        mikeStatus.classList.remove("text-success");
        isMikeStarted = false;
        speechRecognition.stop();
        console.log("mike stoped");
      }
    };

    const startMike = () => {
      if (!isMikeStarted) {
        mikeStatus.innerText = "listening";
        mikeStatus.classList.add("text-success");
        mikeStatus.classList.remove("text-danger");
        isMikeStarted = true;
        speechRecognition.start();
        console.log("mike listening");
      }
    };

    speechRecognition.onerror = (error) => {
      console.log({ error });
      stopMike();
    };

    speechRecognition.onaudiostart = () => {
      console.log("audio started", { isMikeStarted });
      isMikeStarted = true;
    };

    speechRecognition.onaudioend = () => {
      console.log("audio ended", { isMikeStarted });
      isMikeStarted = false;
    };

    speechRecognition.onresult = (event) => {
      console.log({ result: event });
      resultTag.innerText = event?.results[0][0].transcript;
    };

    speechRecognition.onspeechend = () => {
      setTimeout(() => {
        stopMike();
      }, 2000);
    };

    speechStartBtn.onclick = () => {
      startMike();
    };

    speechStopBtn.onclick = () => {
      stopMike();
    };

    speechClearBtn.onclick = () => {
      resultTag.innerText = "";
    };
  } else {
    speechStartBtn.remove();
    speechStopBtn.remove();
    speechClearBtn.remove();
    resultTag.innerText =
      "Your browser is not supporting speech recognition. Please try by checking updated version of chrome!";
    resultTag.classList.add("text-danger");
  }

  // text to speech
  if (
    speechSynthesis &&
    SpeechSynthesisUtterance &&
    typeof speechSynthesis === "object" &&
    typeof SpeechSynthesisUtterance === "function"
  ) {
    readTextBtn.onclick = () => {
      const text = resultTag.innerText || "There is no result";
      speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    };
  } else {
    readTextBtn.remove();
  }
})(window, document);
