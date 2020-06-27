const request = new SpeechSynthesisUtterance()

let voices = []
const voicesDropdownList = document.querySelector('#voices')

const textInput = document.querySelector('#text-input')

const rate = document.querySelector('#rate')
const rateLabel = document.querySelector('#rate-label')
const pitch = document.querySelector('#pitch')
const pitchLabel = document.querySelector('#pitch-label')

const speakButton = document.querySelector('#speak')
const stopButton = document.querySelector('#stop')


function populateVoicesDropdownList() {
    voices = this.getVoices()
    voicesDropdownList.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('')
}

function setVoice() {
    request.voice = voices.find(voice => voice.name === this.value)
}

function setSpeechPitch() {
    request.pitch = this.value
    pitchLabel.innerHTML = `Pitch: ${request.pitch.toFixed(1)}`
}

function setSpeechRate() {
    request.rate = this.value
    rateLabel.innerHTML = `Rate: ${request.rate.toFixed(1)}`
}

function play() {
    stop()
    request.text = textInput.value
    speechSynthesis.speak(request)
}

function stop() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel()
    }
}


speechSynthesis.addEventListener('voiceschanged', populateVoicesDropdownList);
voicesDropdownList.addEventListener('change', setVoice);
rate.addEventListener('input', setSpeechRate)
pitch.addEventListener('input', setSpeechPitch)
speakButton.addEventListener('click', play)
stopButton.addEventListener('click', stop)