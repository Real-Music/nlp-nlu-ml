try {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const input = document.querySelector("input");
  recognition.interimResults = true;

  let p = document.createElement("p");
  const words = document.querySelector(".words");
  words.appendChild(p);
  let transcript;

  recognition.addEventListener("result", e => {
    transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join("");

    p.textContent = transcript;
    input.setAttribute("placeholder", transcript);

    if (e.results[0].isFinal) {
      p = document.createElement("p");
      words.appendChild(p);
    }
  });

  mic = document.querySelector(".fas");
  mic.addEventListener("click", () => {
    mic.classList.add("active");
    recognition.start();
  });

  const msg = new SpeechSynthesisUtterance();
  voices = window.speechSynthesis.getVoices();

  function populateVoices() {
    voices = this.getVoices();
  }

  function setVoice() {
    msg.voice = voices[2];
    toggle();
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  speechSynthesis.addEventListener("voiceschanged", populateVoices);
  // voicesDropdown.addEventListener("change", setVoice);

  recognition.addEventListener("end", () => {
    // setVoice();
    text = "";
    if (transcript.includes("good morning")) {
      console.log("yes");
      text =
        "There are more than 60 committed staff working on access and outreach across Oxford University. Each college is linked to a region in the UK, and the schools in the region have a college contact, from whom they can request information, a visit or just get some advice on applying";
      msg.text = text;
      speechSynthesis.speak(msg);
    }
    mic.classList.remove("active");
  });
} catch (error) {
  alert(
    "https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjw9L_tBRBXEiwAOWVVCVCPtxVXzdv11gnXtIDHRc-xdsAtQPsDdktgQV6uDavsvmVtlieG6xoCXYQQAvD_BwE&gclsrc=aw.ds"
  );
}
