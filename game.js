const game = document.getElementById("game");
const player = document.getElementById("player");
const myScore = document.getElementById("score")
let bullets = [];
let chickens = [];
let score = 0;
let keysPressed = {};

// Create chickens
function createChickens() {
  for (let i = 0; i < 8; i++) {
    const chicken = document.createElement("div");
    chicken.classList.add("chicken");
    chicken.style.left = `${Math.random() * (game.clientWidth - 40)}px`;
    chicken.style.top = `${i * 40}px`;
    game.appendChild(chicken);
    chickens.push(chicken);
  }
}

// Move player
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

// Shoot bullets
function shoot() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = `${player.offsetLeft + 37}px`;
  bullet.style.top = `${player.offsetTop - 10}px`;
  game.appendChild(bullet);
  bullets.push(bullet);
}

// Move bullets
function moveBullets() {
  bullets.forEach((bullet, index) => {
    const bulletTop = parseInt(bullet.style.top);

    bullet.style.top = `${bulletTop - 4}px`; // Move bullet upwards

    const bulletRect = bullet.getBoundingClientRect();

    // Check for collision with chickens
    chickens.forEach((chicken, chickenIndex) => {
      if (isColliding(bulletRect, chicken.getBoundingClientRect())) {
        game.removeChild(bullet);
        game.removeChild(chicken);
        bullets.splice(index, 1);
        chickens.splice(chickenIndex, 1);
        score++;
        myScore.textContent = `Score: ${score}`;
        console.log("Score:", score);
      }
    });

    // Remove bullet if it goes off screen
    if (bulletRect.bottom > game.getBoundingClientRect().bottom) {
      game.removeChild(bullet);
      bullets.splice(index, 1);
    }
  });
}

function moveChickens() {
chickens.forEach((chicken) => {
const chickenTop = parseInt(chicken.style.top);
chicken.style.top = `${chickenTop + 1}px`; // Move chickens downwards

// Check if any chicken reaches the bottom
if (chickenTop > game.clientHeight) {
alert("Game Over!");
location.reload(); // Restart the game
}
});
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

// Game loop
function gameLoop() {
  movePlayer();
  moveBullets();
  moveChickens();
  requestAnimationFrame(gameLoop);
}

// Control the player and shoot bullets
// Control the player and shoot bullets
document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;

  // Check for shooting
  if (event.key === " ") {
    shoot();
  }
});

document.addEventListener("keyup", (event) => {
  delete keysPressed[event.key];
});

// Start the game
createChickens();
gameLoop();