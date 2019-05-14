var video = document.querySelector("#video");
var colorResult = document.querySelector("#result");
var feed = document.querySelector(".feed");
var Canvas = document.querySelector("#Canvas");
var context = Canvas.getContext("2d");
var feedDiv = document.querySelector(".feedDiv")
window.addEventListener("DOMContentLoaded", init);

function init() {
  initFeed();
  initMic();
  initCanvas();
}

function initFeed() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function(stream) {
        video.srcObject = stream;
      })
      .catch(function(err0r) {
        feedDiv.innerHTML="Sorry, Your Browser doesn't support video feed"
        feedDiv.style.padding="20px"
      });
  }
}

function initMic() {
  var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
    SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
  var numbers = ["1", "2", "3"];
  var grammar =
    "#JSGF V1.0; grammar colors; public <color> = " +
    numbers.join(" | ") +
    " ;";
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.start();
  rec(recognition, numbers);
}

function rec(recognition, numbers) {
  recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var number = event.results[last][0].transcript;
    if (number.charAt(0) === " ") {
      number = number.slice(1);
    }
    if (numbers.includes(number)) {
      colorResult.innerHTML = `Result: ${number}`;
      var imageData = context.getImageData(0, 0, Canvas.width, Canvas.height);
      switch (number) {
        case "1":
          redGreen(imageData.data);
          break;
        case "2":
          blueYellow(imageData.data);
          break;
        case "3":
          complete(imageData.data);
          break;
        default:
          console.log("error, you shouldn't have got here");
      }
    } else {
      colorResult.innerHTML = "Result: Didn't recognize the color";
    }
  };
  recognition.onend = () => {
    recognition.start();
    rec(recognition);
  };
}

function initCanvas() {
  video.addEventListener("canplay", function() {
    Canvas.width = video.videoWidth;
    Canvas.height = video.videoHeight;
    video.play();
    drawFrame(video);
  });
}

function drawFrame(video) {
  context.drawImage(video, 0, 0);

  setTimeout(function() {
    drawFrame(video);
  }, 10);
}

/*
Below functions will manipulate each pixel such that it will simulate the chosen colorblindness
*/
function redGreen(data) {
  for (var i = 0; i < data.length; i += 4) {}
}

function blueYellow(data) {
  for (var i = 0; i < data.length; i += 4) {}
}

function complete(data) {
  for (var i = 0; i < data.length; i += 4) {}
}
