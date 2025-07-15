let level1 = new Audio('../audio/level1.mp3');
let level2 = new Audio('../audio/level2.mp3');
let loss = new Audio('../audio/loss.mp3');
function laserAudio() {
    let laser = new Audio('../audio/laser.mp3');
    laser.volume = 0.1
    laser.play()
}
function level1Audio() {
    level1.play()
}
function lossAudio() {
    level1.pause()
    loss.play()
}
function hitAudio(){
    let hit = new Audio('../audio/hit.wav')
    hit.play()
}

function switchAudio() {
    let swi = new Audio('../audio/switch.mp3')
    swi.play()
    swi.volume = 0.2
}