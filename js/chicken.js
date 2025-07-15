let chickens = [];
let Cbullets = [];

function createChickens(n) {
  for (let i = 0; i < n; i++) {
    const chicken = document.createElement("div");
    chicken.classList.add("chicken");
    chicken.style.left = `${Math.random() * (game.clientWidth - 40)}px`;
    chicken.style.top = `${(i * 30)-200}px` ;
    game.appendChild(chicken);
    chickens.push(chicken);
  }
}

function moveChickens() {
  chickens.forEach((chicken) => {
    const chickenTop = parseInt(chicken.style.top);
    chicken.style.top = `${chickenTop + 1}px`; // Move chickens downwards

    // Check if any chicken reaches the bottom
    if (chickenTop > game.clientHeight) {
      health--;
      hitAudio();
      if (health == 2) {
        changeHp.src = "../images/2hp.png";
      }
      if (health == 1) {
        changeHp.src = "../images/1hp.png";
      }
      if (health == 0) {
        changeHp.src = "../images/0hp.png";
        showGameOver();
      }
      chicken.style.top = "0px";
    }
  });
}
function Cshoot() {
  chickens.forEach((chicken) => {
    const chickkenBullet = document.createElement("div");
    chickkenBullet.classList.add("bullet1");
    chickkenBullet.style.left = `${chicken.offsetLeft + 37}px`;
    chickkenBullet.style.top = `${chicken.offsetTop + 10}px`;
    game.appendChild(chickkenBullet);
    Cbullets.push(chickkenBullet);
  });
}

function moveCBullets() {
  Cbullets.forEach((bullet1, index) => {
    const bulletTop1 = parseInt(bullet1.style.top);

    bullet1.style.top = `${bulletTop1 + 2}px`;

    const bulletRect1 = bullet1.getBoundingClientRect();

    // Check for collision with chickens
    if (isColliding(bulletRect1, player.getBoundingClientRect())) {
      {
        game.removeChild(bullet1);
        health--;
        Cbullets.splice(index, 1);
        hitAudio();
        if (health == 0) {
          changeHp.src = "../images/0hp.png";
          showGameOver();
        }
        if (health == 1) {
          changeHp.src = "../images/1hp.png";
        }
        if (health == 2) {
          changeHp.src = "../images/2hp.png";
        }
      }
    }

    // Remove bullet if it goes off screen
    if (bulletRect1.bottom > game.getBoundingClientRect().bottom) {
      game.removeChild(bullet1);
      Cbullets.splice(index, 1);
    }
  });
}
