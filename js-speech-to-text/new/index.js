try {
  // let prom = prompt("Enter passcode");
  // console.log(prom);
  axios.defaults.headers.common["Content-Type"] = "application/json";
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // Voice
  const msg = new SpeechSynthesisUtterance();
  let voices = window.speechSynthesis.getVoices();

  function populateVoices() {
    voices = voices;
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

  function respondToDom(text) {
    let p = document.createElement("p");
    p.classList.add("message");
    p.innerHTML = text;
    return p;
  }

  function loader() {
    let div = document.createElement("div");
    div.classList.add("lds-ellipsis");
    div.classList.add("active");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let div4 = document.createElement("div");

    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(div3);
    div.appendChild(div4);

    return div;
  }
  const recognition = new SpeechRecognition();
  // let input = document.querySelector(".input #user_text");
  var chat = document.getElementById("chat");
  // Set InterResult
  recognition.interimResults = true;

  function createElement(arg) {
    let ele = document.createElement(arg);
    return ele;
  }
  const words = document.querySelector("#chat");
  // words.appendChild(p);

  // Transcript from mic
  let transcrip;

  // Listening to user input
  recognition.addEventListener("result", e => {
    let p = document.createElement("p");
    p.classList.add("message");
    p.classList.add("parker");
    // words.append(p);
    // const input = document.querySelector(".input #user_text");
    let input = document.querySelector(".input #user_text");
    input.setAttribute("placeholder", transcrip);

    transcrip = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join("");

    // Finding user input
    p.textContent = transcrip;
    // When user stop talking
    if (e.results[0].isFinal) {
      // p = document.createElement("p");
      words.appendChild(p);
      input.setAttribute("placeholder", "");
    }
  });

  mic = document.querySelector(".fa-microphone");
  mic.addEventListener("click", () => {
    mic.classList.add("active");
    recognition.start();
  });
  // speechSynthesis.addEventListener("voiceschanged", populateVoices);

  recognition.addEventListener("end", () => {
    populateVoices();
    let spinner = loader();
    words.append(spinner);
    console.log(transcrip);
    if (transcrip != undefined) {
      axios
        .post("http://127.0.0.1:5000/nlp", { text: transcrip })
        .then(function(response) {
          let p;
          let data = response.data.data;
          let status = Array.isArray(data["nlp response"] || data);
          if (status) {
            for (let i = 0; i < data["nlp response"].length; i++) {
              setTimeout(async function timer() {
                p = respondToDom(data["nlp response"][i]);
                words.appendChild(p);
                msg.text = data["nlp response"][i];
                chat.scrollTop = chat.scrollHeight - chat.clientHeight;
                speechSynthesis.speak(msg);
              }, i * 3000);
            }
            // data["nlp response"].forEach(async element => {
            //   // text += `${element} _ `;
            //   p = respondToDom(element);
            //   console.log(element, "elffffffffffffffffff");
            //   words.appendChild(p);
            //   setTimeout(() => {
            //     msg.text = element;
            //     speechSynthesis.speak(msg);
            //   }, 1000);

            // msg.text = element;
            // speechSynthesis.speak(msg);
            // });

            // text = text.replace(/_/g, "<br>");
            // p = respondToDom(text);
            // words.appendChild(p);
          } else {
            let text = data["nlp response"];
            msg.text = text;
            p = respondToDom(data["nlp response"]);

            console.log(p);
            words.appendChild(p);

            let ben = document.querySelector("#ben");
            ben.innerHTML = data["nlp response"];
            ben.style.padding = "10px";
            let zebra = document.querySelector("section");
            zebra.appendChild(ben);
            speechSynthesis.speak(msg);

            chat.scrollTop = chat.scrollHeight - chat.clientHeight;
            console.log(false);
          }
          spinner.classList.remove("active");
          console.log(response.data.data["nlp response"]);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      spinner.classList.remove("active");
    }

    transcrip = "";

    mic.classList.remove("active");
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  });

  // Button
  let input_text = document.querySelector("#user_text");
  let sendBtn = document.querySelector(".fa-paper-plane");

  sendBtn.addEventListener("click", e => {
    populateVoices();
    let user_text = e.currentTarget.parentNode.parentNode.querySelector(
      "#user_text"
    );
    let p = document.createElement("p");
    p.classList.add("message");
    p.classList.add("parker");
    p.innerHTML = user_text.value;
    let spinner = loader();
    words.appendChild(spinner);

    if (user_text.value != "") {
      words.appendChild(p);

      axios
        .post("http://127.0.0.1:5000/nlp", { text: user_text.value })
        .then(function(response) {
          let p;
          let data = response.data.data;
          let status = Array.isArray(data["nlp response"] || data);
          if (status) {
            for (let i = 0; i < data["nlp response"].length; i++) {
              setTimeout(async function timer() {
                p = respondToDom(data["nlp response"][i]);
                words.appendChild(p);
                msg.text = data["nlp response"][i];
                chat.scrollTop = chat.scrollHeight - chat.clientHeight;
                speechSynthesis.speak(msg);
              }, i * 3000);
            }
            // data["nlp response"].forEach(async element => {
            //   // text += `${element} _ `;
            //   p = respondToDom(element);
            //   console.log(element, "elffffffffffffffffff");
            //   words.appendChild(p);
            //   setTimeout(() => {
            //     msg.text = element;
            //     speechSynthesis.speak(msg);
            //   }, 1000);

            // msg.text = element;
            // speechSynthesis.speak(msg);
            // });

            // text = text.replace(/_/g, "<br>");
            // p = respondToDom(text);
            // words.appendChild(p);
          } else {
            let text = data["nlp response"];
            msg.text = text;
            p = respondToDom(data["nlp response"]);

            console.log(p);
            words.appendChild(p);

            let ben = document.querySelector("#ben");
            ben.innerHTML = data["nlp response"];
            ben.style.padding = "10px";
            let zebra = document.querySelector("section");
            zebra.appendChild(ben);

            chat.scrollTop = chat.scrollHeight - chat.clientHeight;
            speechSynthesis.speak(msg);
            console.log(false);
          }
          spinner.classList.remove("active");
          console.log(response.data.data["nlp response"]);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    transcrip = "";
    spinner.classList.remove("active");
    mic.classList.remove("active");
    user_text.value = "";
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    console.log(user_text.value);
  });

  input_text.addEventListener("keyup", event => {
    populateVoices();
    if (event.keyCode === 13) {
      let user_input = event.currentTarget.value;
      let p = document.createElement("p");
      p.classList.add("message");
      p.classList.add("parker");
      p.innerHTML = user_input;
      let spinner = loader();
      words.appendChild(spinner);
      if (user_input != "") {
        words.append(p);
        axios
          .post("http://127.0.0.1:5000/nlp", { text: user_text.value })
          .then(async function(response) {
            let p;
            let data = response.data.data;
            let status = Array.isArray(data["nlp response"] || data);
            if (status) {
              for (let i = 0; i < data["nlp response"].length; i++) {
                setTimeout(async function timer() {
                  p = respondToDom(data["nlp response"][i]);
                  words.appendChild(p);
                  msg.text = data["nlp response"][i];
                  chat.scrollTop = chat.scrollHeight - chat.clientHeight;
                  speechSynthesis.speak(msg);
                }, i * 3000);
              }
              // data["nlp response"].forEach(async element => {
              //   // text += `${element} _ `;
              //   p = respondToDom(element);
              //   console.log(element, "elffffffffffffffffff");
              //   words.appendChild(p);
              //   setTimeout(() => {
              //     msg.text = element;
              //     speechSynthesis.speak(msg);
              //   }, 1000);

              // msg.text = element;
              // speechSynthesis.speak(msg);
              // });

              // text = text.replace(/_/g, "<br>");
              // p = respondToDom(text);
              // words.appendChild(p);
            } else {
              let text = data["nlp response"];
              msg.text = text;
              p = respondToDom(data["nlp response"]);

              console.log(p);
              words.appendChild(p);

              let ben = document.querySelector("#ben");
              ben.innerHTML = data["nlp response"];
              ben.style.padding = "10px";
              let zebra = document.querySelector("section");
              zebra.appendChild(ben);

              chat.scrollTop = chat.scrollHeight - chat.clientHeight;
              speechSynthesis.speak(msg);
              console.log(false);
            }
            spinner.classList.remove("active");
            console.log(response.data.data["nlp response"]);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      transcrip = "";
      // spinner.classList.remove("active");
      mic.classList.remove("active");
      user_text.value = "";
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
      console.log(user_text.value);
    }
  });
  console.log(input_text.value);

  // On End Method
} catch (error) {}
