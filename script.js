const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const canvas = document.getElementById('soundWave');
const ctx = document.getElementById('soundWave').getContext("2d");
let audioContext, analyser, source;

playButton.addEventListener('click', () => {
if (!audioContext) {
audioContext = new (window.AudioContext || window.webkitAudioContext)();
analyser = audioContext.createAnalyser();
source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 256; 
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
    }
}

draw();
}

if (audio.paused) {
audio.play().then(() => {
    console.log("Audio is playing");
}).catch((error) => {
    console.error("Error playing audio:", error);
});
} else {
audio.pause();
console.log("Audio paused");
}
});


