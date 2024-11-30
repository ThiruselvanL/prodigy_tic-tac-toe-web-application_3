const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (board[index] || checkWinner()) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} Wins!`;
    return;
  }

  if (board.every(cell => cell)) {
    message.textContent = 'It\'s a Draw!';
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

// Restart the game
function restartGame() {
  board.fill(null);
  currentPlayer = 'X';
  message.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => (cell.textContent = ''));
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
