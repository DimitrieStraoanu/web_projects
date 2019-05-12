window.addEventListener("DOMContentLoaded", addEventListeners);

var marker = "X";
var markerPlaced;
var winner;
var boardMarkers = new Array(9);
var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
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
    var index = cell.id;
    if (!boardMarkers[index]) {
        boardMarkers[index] = marker;
        cell.innerHTML = marker;
        markerPlaced = true;
    }else{
    markerPlaced = false;
    }
    console.log(markerPlaced);
}

function checkForWin() {

    for (var i = 0; i < winningCombos.length; i++) {

        var combo = winningCombos[i]

        for (var j = 0; j < combo.length; j++) {

            var index = combo[j];

            if (boardMarkers[index] != marker) {
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

    if (markerPlaced) {

        if (marker == "X") {
            marker = "O";
        } else {
            marker = "X";
        }
    }
    console.log(marker);
}