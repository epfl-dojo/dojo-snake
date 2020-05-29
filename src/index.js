console.log("-- best snake made by epfl-dojo --");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//
// Situation de départ
//
// Aide : Gestion d'une touche de clavier
// window.addEventListener("keydown", event => { console.log(event.key); ... }
const width = 20;
const gridElem = width * 2; // 20 cases * 20 cases
let snake = [[9, 9], [8, 9], [7, 9]];
const appleNewPosition = () => {
  return [Math.floor(Math.random() * width), Math.floor(Math.random() * width)];
};

let apple = {
  position: appleNewPosition(),
  power: 1
};

let cmptGrow = 0;
const drawApple = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(
    apple.position[0] * gridElem,
    apple.position[1] * gridElem,
    gridElem,
    gridElem
  );
};

let direction = "e";
let gameover = false;

const drawMap = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 800, 800);
  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Score: " + (snake.length - 3) * 100, 40, 40);
};

const drawSnake = () => {
  ctx.fillStyle = "green";
  for (let element of snake) {
    ctx.fillRect(
      element[0] * gridElem,
      element[1] * gridElem,
      gridElem,
      gridElem
    );
  }
};

const moveSnake = () => {
  let newHead;
  //change direction
  if (direction === "e") {
    newHead = [(snake[0][0] + 1) % width, snake[0][1]];
  }
  if (direction === "o") {
    newHead = [(snake[0][0] - 1 + width) % width, snake[0][1]];
  }
  if (direction === "s") {
    newHead = [snake[0][0], (snake[0][1] + 1) % width];
  }
  if (direction === "n") {
    newHead = [snake[0][0], (snake[0][1] - 1 + width) % width];
  }

  gameover = snake.find(
    snakeElem => snakeElem[0] === newHead[0] && snakeElem[1] === newHead[1]
  );

  snake.unshift(newHead);

  if (snake[0][0] === apple.position[0] && snake[0][1] === apple.position[1]) {
    console.log("Eat !!");
    apple.position = appleNewPosition();
    cmptGrow = 3;
  }
  if (cmptGrow === 0) {
    snake.pop();
  } else {
    cmptGrow = cmptGrow - 1;
  }
};

const keyPushed = e => {
  switch (e.key) {
    case "ArrowRight":
      direction = "e";
      break;
    case "ArrowLeft":
      direction = "o";
      break;
    case "ArrowUp":
      direction = "n";
      break;
    case "ArrowDown":
      direction = "s";
      break;
    default:
      break;
  }
};

window.addEventListener("keydown", keyPushed);

drawMap();
drawApple();
drawSnake();

const nextMove = () => {
  moveSnake();

  drawMap();
  drawApple();
  drawSnake();

  setTimeout(() => {
    if (!gameover) {
      requestAnimationFrame(nextMove);
    } else {
      ctx.fillStyle = "red";
      ctx.font = "80px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    }
  }, 500);
};

// https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame
requestAnimationFrame(nextMove);
