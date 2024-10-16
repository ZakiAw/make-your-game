const game = document.getElementById("game");
const player = document.getElementById("player");
const myScore = document.getElementById("score");

let chickens = [];
let score = 0;
let keysPressed = {};
let shootingInterval = null

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



function freezePage() {
  const fragment = getDOMCopy();

  // Serialize the document fragment to HTML code.
  const serializer = new XMLSerializer();
  const htmlContent = serializer.serializeToString(fragment);

  // Replace the content.
  document.open();
  document.write(htmlContent);
  document.close();
}
function moveChickens() {
  chickens.forEach((chicken) => {
    const chickenTop = parseInt(chicken.style.top);
    chicken.style.top = `${chickenTop + 1}px`; // Move chickens downwards

    // Check if any chicken reaches the bottom
    if (chickenTop > game.clientHeight) {

      lossAudio()
      // alert("Game Over!");
      freezePage()
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
  level1Audio();
  movePlayer();
  moveBullets();
  moveChickens();
  requestAnimationFrame(gameLoop);
}


// Control the player and shoot bullets
// Control the player and shoot bullets
document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;

  // Update player background (just an example, replace with your actual image path)
  player.style.backgroundImage = "url('./MovingShip1.png')";

  // Check for shooting
  if (event.key === " ") {
    laserAudio()
    startShooting();
  }
});

document.addEventListener("keyup", (event) => {
  delete keysPressed[event.key];
  if (Object.keys(keysPressed).length === 0) {
    player.style.backgroundImage = "url('./StillShip1.png')";
  }
  // Stop shooting when space is released
  if (event.key === " ") {
    stopShooting();
  }
});

createChickens();
gameLoop();
