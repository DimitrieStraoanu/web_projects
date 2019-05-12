window.addEventListener("DOMContentLoaded", addEventListeners);

var marker = "X";
var winner = false;
var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
];

function addEventListeners() {
    var gameBoard = document.getElementById("gameBoard");
    gameBoard.addEventListener("click", startGame);
}

function startGame(event) {

    if (!winner) {

        var cell = event.target;

        placeMarker(cell);
        checkForWin();
        nextPlayer();
    }
}

function placeMarker(cell) {

    if (!cell.innerHTML) {

        cell.innerHTML = marker;
    }
}

function checkForWin() {

    var cells = document.getElementsByClassName("cell");
    var win;

    for (var i = 0; i < winningCombos.length; i++) {

        var combo = winningCombos[i]

        for (var j = 0; j < combo.length; j++) {

            var index = combo[j];

            if (cells[index].innerHTML != marker) {
                winner = false;
                break;
            }
            winner = true;
        }
        if (winner == true) {
            console.log("Winner is: ", marker, " combinatia: ", combo);
            break;
        }
    }
}

function nextPlayer() {

    if (marker == "X") {
        marker = "O";
    } else {
        marker = "X";
    }
}