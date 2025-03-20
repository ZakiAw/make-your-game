const fpsDisplay = document.getElementById("fps");
const timerDisplay = document.getElementById("timer");

// natsheh++
let startTime = Date.now();
let times = [];
let fps = 0;
let fpsUpdateInterval = 500;
let lastFpsUpdateTime = performance.now();

let paused = false;
let gameOver = false;

// https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
// natsheh++
function calculateFPS() {
  const now = performance.now();
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  fps = times.length;
  if (now - lastFpsUpdateTime >= fpsUpdateInterval) {
    fpsDisplay.textContent = `FPS: ${fps}`;
    lastFpsUpdateTime = now;
  }
}

// natsheh++
function showGameOver() {
  const finalScore = score;
  const finalTime = timerDisplay.textContent;

  document.getElementById(
    "finalScore"
  ).textContent = `Your Score: ${finalScore}`;
  document.getElementById("finalTime").textContent = `${finalTime}`;

  const gameOverBox = document.getElementById("gameOverBox");
  gameOverBox.style.display = "block";

  gameOver = true;

  updateLead(playerName,score)
  cancelAnimationFrame(gameLoop);
  lossAudio();
}

// natsheh++
// src: wget

let pausedTime = 0;

function updateTimer() {
  if (!paused && !gameOver) {
    const currentTime = Date.now();
    // console.log(currentTime)
    const elapsedTime = currentTime - startTime - pausedTime;
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);

    // 3shan seconds tkon 5anten
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    timerDisplay.textContent = `Time: ${minutes}:${formattedSeconds}`;
  }
}

document.getElementById("restartButton").addEventListener("click", function () {
  window.location.reload();
});


