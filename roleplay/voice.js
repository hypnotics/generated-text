var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var synth = window.speechSynthesis

var recognition = new SpeechRecognition()
recognition.continuous = false
recognition.lang = 'en-US'
recognition.interimResults = false
recognition.maxAlternatives = 1
var loop = null

var diagnostic = document.querySelector('.output')

document.querySelector('#start').onclick = function () {
  document.querySelector('#start').style.display = 'none'
  document.querySelector('#stop').style.display = 'inline-block'
  speak('Hello. What is your name?')
  loop = setTimeout(function () { recognition.start() }, 2000)
  console.log('Ready to receive a command.')
}

document.querySelector('#stop').onclick = function () {
  document.querySelector('#start').style.display = 'inline-block'
  document.querySelector('#stop').style.display = 'none'
  clearTimeout(loop)
  console.log('Interaction ended.')
}

recognition.onresult = function (event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1
  var input = event.results[last][0].transcript

  diagnostic.textContent = 'Result received: ' + input + '.'

  var returnedResponses = reply(input)

  if (returnedResponses.length === 1) {
    speak(returnedResponses[0].answer, returnedResponses[0].voice)
    let pause = 1000 + (returnedResponses[0].answer.split(' ').length * 500)
    console.log(pause)
    loop = setTimeout(function () { recognition.start() }, pause)
  } else {
    speak(returnedResponses[0].answer, returnedResponses[0].voice)
    let pause1 = 1000 + (returnedResponses[0].answer.split(' ').length * 500)
    console.log(pause1)
    var t1 = setTimeout(function () { speak(returnedResponses[1].answer, returnedResponses[1].voice) }, pause1)
    var total = returnedResponses[0].answer + returnedResponses[1].answer
    let pause2 = 2000 + (total.split(' ').length * 500)
    console.log(pause2)
    loop = setTimeout(function () { recognition.start() }, pause2)
  }

  // speak('You are in a burning forest')
  // bg.style.backgroundColor = color
  console.log('Confidence: ' + event.results[0][0].confidence)
}

recognition.onspeechend = function () {
  recognition.stop()
}

recognition.onnomatch = function (event) {
  diagnostic.textContent = "I didn't recognise that."
}

recognition.onerror = function (event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error
}

function speak (phrase, person = 'Veena') {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking')
    return
  }
  if (phrase !== '') {
    var utterThis = new SpeechSynthesisUtterance(phrase)
    utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend')
    }
    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror')
    }

    var voices = synth.getVoices()
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === person) {
        utterThis.voice = voices[i]
      }
    }
    utterThis.pitch = 0.8
    utterThis.rate = 0.8
    synth.speak(utterThis)
  }
}
