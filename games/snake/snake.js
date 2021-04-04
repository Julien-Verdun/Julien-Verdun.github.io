var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var gameState = document.getElementById("game-state");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var fps = 5;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

var guyX,
  guyY,
  widthGuy = 20,
  heightGuy = 20;

var score = 0;

var tailLength = 5,
  tail = [];

var miceRadius = widthGuy / 2,
  nbMice = 2,
  mice = [];

initGame();

var grid = [];
for (var i = 0; i <= parseInt(canvas.width / widthGuy); i++) {
  grid.push([i * widthGuy, 0, i * widthGuy, canvas.height]);
}
for (var j = 0; j <= parseInt(canvas.height / heightGuy); j++) {
  grid.push([0, j * heightGuy, canvas.width, j * heightGuy]);
}

var celerity = widthGuy;

var dx, dy;

var spacePressed = false,
  rightPressed = false,
  leftPressed = false,
  upPressed = false,
  downPressed = false;

var score = 0;

var hasStarted = false;

function initGame() {
  score = 0;
  guyX = 40;
  guyY = canvas.height - 60;

  dx = celerity;
  dy = 0;

  mice = [];
  for (var i = 0; i < nbMice; i++) {
    mice.push([
      parseInt(Math.random() * (canvas.width / widthGuy)),
      parseInt(Math.random() * (canvas.height / heightGuy)),
    ]);
  }

  tail = [];

  for (var i = 1; i <= tailLength; i++) {
    tail.push([parseInt(guyX / widthGuy) - i, parseInt(guyY / heightGuy)]);
  }

  // then = Date.now();
}

function start() {
  console.log("START");
  initGame();
  gameState.innerHTML = null;
  hasStarted = true;
}

function defeat() {
  gameState.innerHTML = "You lost !!";
  stop();
}

function stop() {
  console.log("STOP");
  hasStarted = false;
}

function keyDownHandler(e) {
  //   console.log(e);
  if (e.keyCode === 32) {
    spacePressed = true;
  } else if (e.keyCode === 38) {
    upPressed = true;
  } else if (e.keyCode === 40) {
    downPressed = true;
  } else if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode === 32) {
    spacePressed = false;
  } else if (e.keyCode === 38) {
    upPressed = false;
  } else if (e.keyCode === 40) {
    downPressed = false;
  } else if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}

function drawMice() {
  mice.forEach((mouse) => {
    ctx.beginPath();
    ctx.arc(
      mouse[0] * widthGuy + miceRadius,
      mouse[1] * heightGuy + miceRadius,
      miceRadius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "#FF9500";
    ctx.fill();
    ctx.closePath();
  });
}

// void ctx.arc(x, y, rayon, angleDépart, angleFin, sensAntiHoraire);
// void ctx.rect(x, y, width, height);
function drawGuy() {
  ctx.beginPath();
  ctx.rect(guyX, guyY, widthGuy, heightGuy);
  ctx.fillStyle = hasStarted ? "#00DD95" : "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function drawTail() {
  tail.forEach((cell) => {
    ctx.beginPath();
    ctx.rect(cell[0] * widthGuy, cell[1] * heightGuy, widthGuy, heightGuy);
    ctx.fillStyle = hasStarted ? "#0095DD" : "#FF5555";
    ctx.fill();
    ctx.closePath();
  });
}

function moveTail() {
  let newCell;
  if (dx === 0) {
    if (dy < 0) {
      newCell = [parseInt(guyX / widthGuy), parseInt(guyY / heightGuy) + 1];
    } else {
      newCell = [parseInt(guyX / widthGuy), parseInt(guyY / heightGuy) - 1];
    }
  } else if (dy === 0) {
    if (dx < 0) {
      newCell = [parseInt(guyX / widthGuy) + 1, parseInt(guyY / heightGuy)];
    } else {
      newCell = [parseInt(guyX / widthGuy) - 1, parseInt(guyY / heightGuy)];
    }
  }

  return [newCell].concat(tail.slice(0, tail.length - 1));
}

function detectCollision() {
  let mouse;
  for (var i = 0; i < mice.length; i++) {
    mouse = mice[i];
    if (guyX === mouse[0] * widthGuy && guyY === mouse[1] * heightGuy) {
      eatMouse(i);
      score++;
      break;
    }
  }

  let cell;
  for (var i = 0; i < tail.length; i++) {
    cell = tail[i];
    if (guyX === cell[0] * widthGuy && guyY === cell[1] * heightGuy) {
      defeat();
      return true;
    }
  }
  return false;
}

function eatMouse(mouseIndex) {
  mice.splice(mouseIndex, 1);

  mice.push([
    parseInt(Math.random() * (canvas.width / widthGuy)),
    parseInt(Math.random() * (canvas.height / heightGuy)),
  ]);

  let newCell;
  if (dx === 0) {
    if (dy < 0) {
      newCell = [tail[tail.length - 1][0], tail[tail.length - 1][1] + 1];
      //[parseInt(guyX / widthGuy), parseInt(guyY / heightGuy) + 1];
    } else {
      newCell = [tail[tail.length - 1][0], tail[tail.length - 1][1] - 1];
      //[parseInt(guyX / widthGuy), parseInt(guyY / heightGuy) - 1];
    }
  } else if (dy === 0) {
    if (dx < 0) {
      newCell = [tail[tail.length - 1][0] + 1, tail[tail.length - 1][1]];
      //[parseInt(guyX / widthGuy) + 1, parseInt(guyY / heightGuy)];
    } else {
      newCell = [tail[tail.length - 1][0] - 1, tail[tail.length - 1][1]];
      //[parseInt(guyX / widthGuy) - 1, parseInt(guyY / heightGuy)];
    }
  }

  tail = tail.concat([newCell]);
}

function drawGrid() {
  grid.forEach((line) => {
    ctx.beginPath();
    ctx.moveTo(line[0], line[1]);
    ctx.lineTo(line[2], line[3]);
    ctx.stroke();
  });
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
  let tailBit = false;

  requestAnimationFrame(draw);

  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuy();
    drawTail();
    drawGrid();
    drawMice();
    drawScore();

    if (hasStarted) {
      if (leftPressed && !(dx === celerity && dy === 0)) {
        dx = -celerity;
        dy = 0;
      } else if (rightPressed && !(dx === -celerity && dy === 0)) {
        dx = celerity;
        dy = 0;
      } else if (upPressed && !(dx === 0 && dy === celerity)) {
        dx = 0;
        dy = -celerity;
      } else if (downPressed && !(dx === 0 && dy === -celerity)) {
        dx = 0;
        dy = celerity;
      }

      guyX += dx;
      guyY += dy;

      if (2 + parseInt(score / 5) === nbMice + 1) {
        nbMice++;
        mice.push([
          parseInt(Math.random() * (canvas.width / widthGuy)),
          parseInt(Math.random() * (canvas.height / heightGuy)),
        ]);
      }

      tailBit = detectCollision();

      if (tailBit) {
        console.log("tailBit");
        guyX -= dx;
        guyY -= dy;
      } else {
        tail = moveTail();

        if (guyX > canvas.width) {
          guyX = 0;
        }
        if (guyY > canvas.height) {
          guyY = 0;
        }

        if (guyX < 0) {
          guyX = canvas.width;
        }
        if (guyY < 0) {
          guyY = canvas.height;
        }
      }
    }

    then = now - (delta % interval);
  }
}

// start();
draw();
