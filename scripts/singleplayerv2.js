var woodBoard = Array.from(Array(9).keys());;
const human = "A";
const computer = "B";
const combinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
// Select randomized Startplayer
let playerSelection = [human, computer];
let currentPlayer = playerSelection[Math.floor(Math.random() * playerSelection.length)];
// Start
currentPlayer = human;
setStatus(`It's your turn!`);

// Set correct theme
window.onload = function() {
    const theme = localStorage.getItem('ui-theme');
    if (theme=='light') {
      document.documentElement.setAttribute('ui-theme', 'light');
      isInDarkMode = false;
    } else if (theme=='') {
      document.documentElement.setAttribute('ui-theme', 'light');
      isInDarkMode = false;
    } else if (theme=='dark') {
      document.documentElement.setAttribute('ui-theme' , 'dark');
      isInDarkMode = true;
    }
}
// Go back to the Homepage
function toMenu() {
    window.location.href = "../index.html";
}

// Restart the Game by reloading the Webpage :)
function restart() {
    window.location.href = "singleplayer.html";
}

// Switch between human and computer
function switchPlayer() {
    if (currentPlayer === human) {
        currentPlayer = computer;
        setStatus(`It's AI's turn!`);
        computerPlaceMarker();
    } else if (currentPlayer === computer) {
        currentPlayer = human;
        setStatus(`It's your turn!`);
    }
}

// Update the Status text
function setStatus(msg) {
    document.getElementById("status").textContent = msg;
}

// Computer place function
function computerPlaceMarker() {
    var id = getSpot() + 1;
    woodBoard[id-1] = computer;
    document.getElementById("placeImageHere_" + id).src = "../src/iconPlayer_B.png";
    document.getElementById(id).disabled = true;
    document.getElementById(id).name = computer;

    if (!checkTie()) {
        let gameWon = checkWin(woodBoard, computer)
        gameWon ? gameOver(gameWon) : switchPlayer();
    }
}

// Human place function
function placeMarker(id) {
    document.getElementById("placeImageHere_" + id).src = "../src/iconPlayer_A.png";
    document.getElementById(id).disabled = true;
    document.getElementById(id).name = human;

    woodBoard[id-1] = human;
    if (!checkTie()) {
        let gameWon = checkWin(woodBoard, computer)
	    gameWon ? gameOver(gameWon) : switchPlayer();
    } else {

    }
}

// Specific function for Minimax Algorithm
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => 
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of combinations.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

// Check if there is a Tie
function checkTie() {
    if (getEmptySquares().length == 0) {
        setStatus("It's a Tie!");
        return true;
    }
    return false;
}

// Call this when Game over
function gameOver(gameWon) {
    for (let index of combinations[gameWon.index]) {
        document.getElementById(index+1).style.backgroundColor = gameWon.player == human ? "green" : "red";
    }
    for (let i = 1; i < 10; i++) {
        document.getElementById(i).disabled = true;
    }
    if (gameWon.player == computer) {
        setStatus("You lose.");
    } else {
        setStatus("You win!");
    }
}

// return Array with empty Squares
function getEmptySquares() {
    return woodBoard.filter(s => typeof s == 'number');
}

// Get best spot calculated by Minimax Algorithm
function getSpot() {
    let res = executeMinimax(woodBoard, computer).index;
    console.log("executeMinimax: Best Marker for next Round: " + res);
    return res;
}

function executeMinimax(board, player) {
    var emptySquares = getEmptySquares();

    if (checkWin(board, human)) {
        return {score: -10};
    } else if (checkWin(board, computer)) {
        return {score: 10};
    } else if (emptySquares.length === 0) {
        return {score: 0};
    }
    var moves = [];

    for (var i = 0; i < emptySquares.length; i++) {

        var move = {};
        move.index = board[emptySquares[i]];
        board[emptySquares[i]] = player;

        if (player === computer) {
            var res = executeMinimax(board, human);
            move.score = res.score;
        } else {
            var res = executeMinimax(board, computer);
            move.score = res.score;
        }

        board[emptySquares[i]] = move.index;
        moves.push(move);
    }

    var bestMove;

    if (player === computer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}