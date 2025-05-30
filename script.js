const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 'red';
let gameOver = false;

const boardEl = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', init);

function init() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  currentPlayer = 'red';
  gameOver = false;
  renderBoard();
}

function renderBoard() {
  boardEl.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', handleClick);
      const disc = board[r][c];
      if (disc) {
        const discEl = document.createElement('div');
        discEl.classList.add('disc', disc);
        cell.appendChild(discEl);
      }
      boardEl.appendChild(cell);
    }
  }
}

function handleClick(e) {
  if (gameOver) return;
  const col = +e.currentTarget.dataset.col;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;
      break;
    }
  }
  renderBoard();
  if (checkWin()) {
    alert(`${currentPlayer.toUpperCase()} wins!`);
    gameOver = true;
    return;
  }
  currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
}

function checkWin() {
  function countDirection(r, c, dr, dc) {
    let count = 0;
    let row = r;
    let col = c;
    while (
      row >= 0 && row < ROWS &&
      col >= 0 && col < COLS &&
      board[row][col] === currentPlayer
    ) {
      count++;
      row += dr;
      col += dc;
    }
    return count;
  }
  
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== currentPlayer) continue;
      const dirs = [[0,1],[1,0],[1,1],[1,-1]];
      for (let [dr, dc] of dirs) {
        const total = 
          countDirection(r, c, dr, dc) +
          countDirection(r, c, -dr, -dc) - 1;
        if (total >= 4) return true;
      }
    }
  }
  return false;
}

document.addEventListener('DOMContentLoaded', init);
