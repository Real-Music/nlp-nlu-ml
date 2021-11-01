// Global variable that leaves in the broswer and that live on top of the window
// But chrome uses webkit
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// Instance of the recognition class
const recognition = new SpeechRecognition();
recognition.interimResults = true; // it convert the audio to text
// If you don't this, you'll have to talk and finish before the result shows

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", e => {
  console.log(e.results);
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("");

  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }

  if (transcript.includes("good morning")) {
    console.log("yes yes yes yes yes yes");
  }
});

recognition.addEventListener("end", recognition.start);

recognition.start();
