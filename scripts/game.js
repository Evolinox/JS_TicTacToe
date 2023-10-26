const players = ["A", "B"];

let currentPlayer = players[Math.floor(Math.random() * players.length)]
let step = 0;
document.getElementById("status").textContent = `Player ${currentPlayer}'s turn!`;

const superConstellation = [
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7]
]

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
      document.getElementById("nightmode").src = "src/sun.svg";
      isInDarkMode = true;
    }
}

function toMenu() {
    window.location.href = "../index.html";
}

function restart() {
    window.location.href = "multiplayer.html";
}

function placeMarker(id) {
    document.getElementById("placeImageHere_" + id).src = "../src/iconPlayer_" + currentPlayer + ".png";
    document.getElementById(id).disabled = true;
    document.getElementById(id).name = currentPlayer;

    doBackgroundChecks(currentPlayer);
}

function doBackgroundChecks(player) {
    //first, switch player
    if (currentPlayer === "A") {
        currentPlayer = "B";
        document.getElementById("status").textContent = "Player B's turn!";
    } else {
        currentPlayer = "A";
        document.getElementById("status").textContent = "Player A's turn!";
    }

    //second, increment stepcounter
    step++;

    //third, check if we have a winner
    if (checkWinner(player)) {
        for (let id = 1; id < 10; id++) {
            document.getElementById(id).disabled = true;
        }
    } else if (step > 8) {
        endGame("It's a Tie!");
    }
}

function endGame(msg) {
    document.getElementById("status").textContent = msg;
}

function checkWinner(player) {
    for (let i = 0; i < superConstellation.length; i++) {
        if (
            document.getElementById(superConstellation[i][0]).getAttribute("name") == player &&
            document.getElementById(superConstellation[i][1]).getAttribute("name") == player &&
            document.getElementById(superConstellation[i][2]).getAttribute("name") == player
        ) {
            endGame(`Player ${player} has won!`);
            return true;
        } 
    }
    return false;
} 