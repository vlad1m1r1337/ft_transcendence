const ctx = new AudioContext();
let audio;

fetch('./assets/Ladon.mp3')
	.then(data => data.arrayBuffer())
	.then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
	.then(decodedAudio => {
		audio = decodedAudio;
})

function payback() {
	console.log('play')
	const playSound = ctx.createBufferSource();
	playSound.buffer = audio;
	playSound.connect(ctx.destination);
	playSound.start(ctx.currentTime);
}

window.addEventListener('DOMContentLoaded', payback);