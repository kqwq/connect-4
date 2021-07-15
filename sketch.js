let turn, arr;
let cellSize = 0
let restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", () => {
  init();
  drawArray();
});
function init() {
  // Hide restart button
  restartBtn.style.display = "none";

  // Player 1 goes first
  turn = 1;

  // Create 2D array of size 7x6 (w x h)
  arr = new Array(6);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(7).fill(0);
    // 0 = empty
    // 1 = player 1 (red)
    // 2 = player 2 (blue)
  }
}
init()

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  cellSize = Math.min(window.innerWidth, window.innerHeight) / arr.length;
  background(100);
  drawArray();
}

function drawArray() {
  background(100);
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == 1) {
        fill(255, 0, 0);
      }
      if (arr[i][j] == 2) {
        fill(0, 0, 255);
      }
      if (arr[i][j] == 0) {
        fill(0, 0, 0);
      }
      rect(j * cellSize, i * cellSize, cellSize, cellSize, cellSize / 2);
    }
  }
}

/**
 * Check if there is a winner
 *
 * @return {Number} winner
 *
 * 1 = player 1 (red)
 * 2 = player 2 (blue)
 * 0 = no winner
 *
 *
 */
function checkWin() {
  // Check for horizontal win
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j <= arr[i].length - 4; j++) {
      let val = arr[i][j];
      if (
        val &&
        val == arr[i][j + 1] &&
        val == arr[i][j + 2] &&
        val == arr[i][j + 3]
      ) {
        // If same color
        return val;
      }
    }
  }
  // Check for vertical win
  for (let i = 0; i <= arr.length - 4; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let val = arr[i][j];
      if (
        val &&
        val == arr[1 + i][j] &&
        val == arr[2 + i][j] &&
        val == arr[3 + i][j]
      ) {
        // If same color
        return val;
      }
    }
  }
  // Check for diagonal win
  for (let i = 0; i <= arr.length - 4; i++) {
    for (let j = 0; j <= arr[i].length - 4; j++) {
      let val = arr[i][j];
      if (
        val &&
        val == arr[1 + i][1 + j] &&
        val == arr[2 + i][2 + j] &&
        val == arr[3 + i][3 + j]
      ) {
        // If same color
        return val;
      }
      val = arr[i][j + 3];
      if (
        val &&
        val == arr[1 + i][j + 3 - 1] &&
        val == arr[2 + i][j + 3 - 2] &&
        val == arr[3 + i][j + 3 - 3]
      ) {
        // If same color
        return val;
      }
    }
  }
  // Check for draw
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == 0) {
        return 0;
      }
    }
  }
  return 2;
}

function mouseClicked() {
  // If mouse is outside canvas
  if (mouseX < 0 || mouseX > window.innerWidth || mouseY < 0 || mouseY > window.innerHeight) {
    return;
  }

  let x = floor(mouseX / cellSize);
  // Get lowest y in connect-4
  for (let i = arr.length - 1; i > -1; i--) {
    if (arr[i][x] == 0) {
      arr[i][x] = turn;
      break;
    }
  }

  // Draw the array
  drawArray();

  // Check if game is over
  let winner = checkWin();
  console.log(winner);
  if (winner != 0 && winner != 2) {
    fill(255);
    textSize(24);
    text(`Player ${winner} is winner!`, mouseX, mouseY);
    restartBtn.style.display = "block";
    return;
  } else if (winner == 2) {
    // Draw
    fill(0, 0, 0);
    textSize(24);
    text("Draw", mouseX, mouseY);
    restartBtn.style.display = "block";
    return;
  }

  turn = turn == 1 ? 2 : 1;
}


