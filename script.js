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
  const readTextBtn = readTextBtn;

  // speech to text
  if (
    webkitSpeechRecognition &&
    typeof webkitSpeechRecognition === "function"
  ) {
    const speechRecognition = new webkitSpeechRecognition();

    const mikeStatus = getElementById("mike-status");

    const stopMike = () => {
      mikeStatus.innerText = "stopped";
      mikeStatus.classList.add("text-danger");
      speechRecognition.stop();
    };

    const startMike = () => {
      mikeStatus.innerText = "listening";
      mikeStatus.classList.add("text-success");
      speechRecognition.start();
    };

    speechRecognition.onerror = (error) => {
      console.log({ error });
      stopMike();
    };

    speechRecognition.onresult = (event) => {
      console.log({ result: event });
      resultTag.innerText = event?.results[0][0].transcript;
    };

    speechRecognition.onspeechend = () => {
      setTimeout(() => {
        console.log("mike stoped");
        stopMike();
      }, 2000);
    };

    speechStartBtn.onclick = () => {
      console.log("mike listening");
      startMike();
    };

    speechStopBtn.onclick = () => {
      console.log("mike stoped");
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
