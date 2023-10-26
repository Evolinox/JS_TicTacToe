const players = ["You", "CPU"];
const delay = ms => new Promise(res => setTimeout(res, ms));

//CPU Specific Variables
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
const neighbours = [
    [2,4,5],
    [1,3,5],
    [2,5,6],
    [1,5,7],
    [1,2,3,4,6,7,8,9],
    [3,5,9],
    [4,5,8],
    [7,5,9],
    [8,5,6]
]
let emptyId = [1,2,3,4,5,6,7,8,9];
let lastId = 0;

let currentPlayer = players[Math.floor(Math.random() * players.length)]
let step = 0;
document.getElementById("status").textContent = `It's ${currentPlayer}r turn!`;

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

if (currentPlayer === "CPU") {
    switchPlayer("CPU");
}

function toMenu() {
    window.location.href = "../index.html";
}

function restart() {
    window.location.href = "singleplayer.html";
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
            return true;
        } 
    }
    return false;
}

function switchPlayer(nextPlayer) {
    if (nextPlayer === "CPU") {
        for (let id = 1; id < 10; id++) {
            document.getElementById(id).disabled = true;
        }
        currentPlayer = nextPlayer;
        document.getElementById("status").textContent = `It's ${currentPlayer}r turn!`;
        cpuTurn();
    } else {
        for (let id = 0; id < emptyId.length; id++) {
            if (document.getElementById(emptyId[id]).getAttribute("src") == null) {
                document.getElementById(emptyId[id]).disabled = false;
            }
        }
        currentPlayer = nextPlayer;
        document.getElementById("status").textContent = `It's ${currentPlayer}r turn!`;
    }
}

function placeMarker(id) {
    document.getElementById("placeImageHere_" + id).src = "../src/iconPlayer_A.png";
    document.getElementById(id).disabled = true;
    document.getElementById(id).name = currentPlayer;
    step++;

    const i = emptyId.indexOf(id);
    emptyId.splice(i, 1);

    if (checkWinner("You")) {
        endGame("You won!");
        for (let id = 1; id < 10; id++) {
            document.getElementById(id).disabled = true;
        }
    } else if (step > 8) {
        endGame("It's a Tie!")
    } else switchPlayer("CPU");
}

function cpuTurn() {
    let id = 0;
    let i  = 0;
    //If first Round, place random
    if (lastId == 0) {
        id = emptyId[Math.floor(Math.random() * emptyId.length)];
        i = emptyId.indexOf(id);
        emptyId.splice(i, 1);
        lastId = id;
        console.log(lastId);
    //If not first Round, try to place next to the last placed spot
    } else {
        let preferredId = neighbours[lastId-1];
        let selection = [];
        for (let m = 0; m < preferredId.length; m++) {
            //Check if the neighbours are free
            if (!document.getElementById(preferredId[m]).hasAttribute("name")) {
                selection.push(preferredId[m]);
                console.log("Button " + preferredId[m] + " expected to be clear")
            }
        }
        //If there are free neighbours, choose one random
        if (selection.length > 0) {
            id = selection[Math.floor(Math.random() * selection.length)];
            i = emptyId.indexOf(id);
            emptyId.splice(i, 1);
        //If no free neighbours, choose a random place on map
        } else {
            id = emptyId[Math.floor(Math.random() * emptyId.length)];
            i = emptyId.indexOf(id);
            emptyId.splice(i, 1);
        }
        lastId = id;
    }

    document.getElementById("placeImageHere_" + id).src = "../src/iconPlayer_B.png";
    step++;
    document.getElementById(id).disabled = true;
    document.getElementById(id).name = currentPlayer;

    if (checkWinner("CPU")) {
        endGame("You lost!");
    } else if (step > 8) {
        endGame("It's a Tie!")
    } else switchPlayer("You");
}