let bullets = [];

function shoot() {
    laserAudio();
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = `${player.offsetLeft + 37}px`;
    bullet.style.top = `${player.offsetTop - 10}px`;
    game.appendChild(bullet);
    bullets.push(bullet);
  }

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
      if (bulletRect.top < game.getBoundingClientRect().top) {
        game.removeChild(bullet);
        bullets.splice(index, 1);
      }
    });
  }
function startShooting() {
    if (!shootingInterval) { 
      shoot();
      shootingInterval = setInterval(shoot, 400);
    }
  }

  function stopShooting() {
    clearInterval(shootingInterval);
    shootingInterval = null; 
  }