// Get the elements
var bar = document.getElementById("bar-1");
var bar2 = document.getElementById("bar-2");
var ball = document.getElementById("ball");
var scoreBox = document.getElementById("score");

var displayId = document.getElementById("player-id");
var movement = 25;

const border = 12;
let moveX = 4;
let moveY = 4;
let movingBall;
let score = 0;
let highScore = 0;
let gameStart = false;
let playerNo = 0;
let bar1wins = true;

//welcome function
(function () {
  if (localStorage.getItem("score") == null) {
    alert("This is Your First Time Player 0");
  } else {
    playerNo = localStorage.getItem("player") || 0;
    highScore = localStorage.getItem("score") || 0;
    alert("Player " + playerNo + " has scored High Score " + highScore);
    playerNo++;
    displayId.textContent = playerNo;
    scoreBox.textContent = score;
  }
})();

function gameReset() {
  bar.style.left = (window.innerWidth - bar.offsetWidth) / 2 + "px";
  bar2.style.left = (window.innerWidth - bar2.offsetWidth) / 2 + "px";
  ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + "px";
  if (!bar1wins)
    ball.style.top = bar.getBoundingClientRect().y + bar.offsetHeight + "px";
  else
    ball.style.top = bar2.getBoundingClientRect().y - ball.offsetHeight + "px";
  moveY = -4;
  score = 0;
  scoreBox.textContent = 0;
  gameStart = false;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "d" || event.key === "ArrowRight") {
    if (
      parseInt(bar.style.left) <
      window.innerWidth - bar.offsetWidth - border
    ) {
      bar.style.left = parseInt(bar.style.left) + movement + "px";
      bar2.style.left = bar.style.left;
    }
  }

  if (event.key === "a" || event.key === "ArrowLeft") {
    if (parseInt(bar.style.left) > border) {
      bar.style.left = parseInt(bar.style.left) - movement + "px";
      bar2.style.left = bar.style.left;
    }
  }

  if (event.key === "Enter" || event.key === " ") {
    if (!gameStart) {
      gameStart = true;
      let ballRect = ball.getBoundingClientRect();
      let ballX = ballRect.x;
      let ballY = ballRect.y;
      let ballDia = ballRect.width;

      let barHeight = bar.offsetHeight;
      let barWidth = bar.offsetWidth;

      movingBall = setInterval(function () {
        let barX = bar.getBoundingClientRect().x;
        if (bar1wins) ballY += moveY;
        else ballY -= moveY;
        ballX += moveX;
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        if (ballX + ballDia > window.innerWidth || ballX < 0) {
          moveX = -moveX; //vertical reflection
        }

        if (ballY <= barHeight) {
          if (ballX >= barX && ballX + ballDia <= barX + barWidth) {
            moveY = -moveY;
            score++; //alive
            scoreBox.textContent = score;
          } else {
            bar1wins = false;
            saveData(score);
          } //game over
        }
        if (ballY + ballDia >= window.innerHeight - barHeight) {
          if (ballX >= barX && ballX + ballDia <= barX + barWidth) {
            moveY = -moveY;
            score++; //alive
            scoreBox.textContent = score;
          } else {
            bar1wins = true;
            saveData(score);
          } //game over
        }
      }, 20);
    }
  }
});

function saveData(score) {
  if (score > highScore) {
    localStorage.setItem("score", score); // Store the updated high score
    localStorage.setItem("player", playerNo);
  }
  clearInterval(movingBall);
  gameReset();

  alert("Nice one! player " + playerNo + " Your score: " + score);
}

gameReset(); // Initialize the game
