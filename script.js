let currentPlayer = "X";
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            message.innerText = `${currentPlayer} wins!`;
            gameOver = true;
            return;
        }
    }
    if (!board.includes('')) {
        message.innerText = "It's a tie!";
        gameOver = true;
    }
}

function cellClicked(index) {
    if (gameOver || board[index] !== '') return;

    board[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
    message.innerText = '';
    currentPlayer = "X";
    gameOver = false;
}
