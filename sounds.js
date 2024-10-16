let level1 = new Audio('./audio/level1.mp3');
let loss = new Audio('./audio/loss.mp3');
function laserAudio() {
    let laser = new Audio('./audio/laser.mp3');
    laser.play()
}
function level1Audio() {
    level1.play()
}
function lossAudio() {
    level1.pause()
    loss.play()
}