const game = document.getElementById("game");
const player = document.getElementById("player");
const myScore = document.getElementById("score");
let Name;

// name save & work
document.addEventListener("DOMContentLoaded", () => {
  const playerNameInput = document.getElementById("name");
  const startGameLink = document.getElementById("start-game");

  startGameLink.addEventListener("click", (event) => {
    event.preventDefault();
    Name = playerNameInput.value;
    localStorage.setItem("playerName", Name);
    window.location.href = "game.html";
  });
});
const playerName = localStorage.getItem("playerName");
console.log(playerName);
//--
let spawns = 6;
let score = 0;
let health = 3;
let keysPressed = {};
let shootingInterval = null;
let pausedStartTime = 0;

function movePlayer() {
  const playerRect = player.getBoundingClientRect();
  const gameRect = game.getBoundingClientRect();

  if (keysPressed["ArrowLeft"] && playerRect.left > gameRect.left) {
    player.style.left = `${playerRect.left - gameRect.left - 5}px`;
  }
  if (keysPressed["ArrowRight"] && playerRect.right < gameRect.right) {
    player.style.left = `${playerRect.left - gameRect.left + 2}px`;
  }
  if (keysPressed["ArrowUp"] && playerRect.top > gameRect.top) {
    player.style.top = `${playerRect.top - gameRect.top - 5}px`;
  }
  if (keysPressed["ArrowDown"] && playerRect.bottom < gameRect.bottom) {
    player.style.top = `${playerRect.top - gameRect.top + 2}px`;
  }
}

// Collision detection
function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function damage() {
  chickens.forEach((chicken, chickenIndex) => {
    if (
      isColliding(
        player.getBoundingClientRect(),
        chicken.getBoundingClientRect()
      )
    ) {
      health--;
      game.removeChild(chicken);
      chickens.splice(chickenIndex, 1);
      hitAudio();
      if (health == 0) {
        changeHp.src = "./images/0hp.png";
        showGameOver();
      }
      if (health == 1) {
        changeHp.src = "./images/1hp.png";
      }
      if (health == 2) {
        changeHp.src = "./images/2hp.png";
      }
    }
  });
}

let lastcshoot = 0;
let lastChickenSpawnTime = 0;
// Game loop
function gameLoop() {
  const currentTime = Date.now();
  if (!paused && !gameOver) {
    if (currentTime - lastChickenSpawnTime > 5000) {
      createChickens(spawns);
      lastChickenSpawnTime = currentTime;
    }
    if (currentTime - lastcshoot > 4000) {
      Cshoot();
      lastcshoot = currentTime;
    }
    level1Audio();
    movePlayer();
    moveBullets();
    moveCBullets();
    moveChickens();
    calculateFPS();
    updateTimer();
    damage();
  }
  requestAnimationFrame(gameLoop);
}
// natsheh++
// Pause/Resume functionality
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    paused = !paused;
    if (paused) {
      pauseMessage.classList.remove("hidden");
      pauseMessage.classList.add("visible");
      pausedStartTime = Date.now();
    } else {
      pauseMessage.classList.remove("visible");
      pauseMessage.classList.add("hidden");
      pausedTime += Date.now() - pausedStartTime;
      lastChickenSpawnTime += Date.now() - pausedStartTime;
      lastcshoot += Date.now() - pausedStartTime;
    }
  }

  if (!paused && !gameOver) {
    keysPressed[event.key] = true;
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowLeft"
    )
      player.style.backgroundImage = "url('./images/MovingShip1.png')";
    if (event.key === " ") {
      startShooting();
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (!paused && !gameOver) {
    delete keysPressed[event.key];
    if (Object.keys(keysPressed).length === 0) {
      player.style.backgroundImage = "url('./images/StillShip1.png')";
    }
    if (event.key === " ") {
      stopShooting();
    }
  }
});

setInterval(() => {
  spawns += 1;
}, 30000);
gameLoop();
