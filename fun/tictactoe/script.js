"use strict";

window.addEventListener("DOMContentLoaded", function () {

    var helper = document.getElementById("helper");
    var cells = document.getElementsByClassName("cell");
    var scoreX = document.getElementById("scoreX");
    var scoreO = document.getElementById("scoreO");
    var gameBoard = document.getElementById("gameBoard");
    var startBtn = document.getElementById("startBtn");
    var scoreBtn = document.getElementById("scoreBtn");
    
    startBtn.addEventListener("click", startGame)
    gameBoard.addEventListener("click", cellClicked);
    scoreBtn.addEventListener("click", resetScore);

    var gameOn;
    var marker;
    var winner;
    var boardMarkers;
    var xWins = 0;
    var oWins = 0;
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

    function startGame() {
        gameOn = true;
        marker = marker || "X";
        winner = false;
        boardMarkers = new Array(9);
        startBtn.innerHTML = "Restart";
        helper.innerHTML = `player-<b>${marker}</b> turn`;
        for (var i = 0; i < cells.length; i++) {
            cells[i].innerHTML = "";
            cells[i].classList.remove("win");
        }
    }

    function cellClicked(event) {

        if (event.target.tagName == "TD") {
            var cell = event.target;
            if (gameOn && placeMarker(cell)) {

                checkForWin();
                nextPlayer();
            }
        }
    }

    function placeMarker(cell) {

        var index = cell.id;

        if (!boardMarkers[index]) {

            boardMarkers[index] = marker;
            cell.innerHTML = marker;
            return true;

        } else {

            return false;
        }
    }

    function checkForWin() {

        for (var i = 0; i < winningCombos.length; i++) {
            var win;
            var combo = winningCombos[i]

            for (var j = 0; j < combo.length; j++) {

                var index = combo[j];

                if (boardMarkers[index] != marker) {
                    win = false;
                    break;
                }
                win = true;
            }
            if (win == true) {
                winner = marker;
                showWinner(combo);
                return;
            }
        }

        for (var i = 0; i < boardMarkers.length; i++) {
            var emptyCells;
            if (!boardMarkers[i]) {
                emptyCells = true;
                break;
            } else {
                emptyCells = false;
            }
        }

        if (emptyCells == false) {
            winner = "draw";
            showWinner();
            return;
        }
    }

    function nextPlayer() {

        if (!winner) {

            if (marker == "X") {
                marker = "O";
            } else {
                marker = "X";
            }
            helper.innerHTML = `player-<b>${marker}</b> turn`;
        }

    }

    function showWinner(combo) {
        
        if (winner == "draw") {

            helper.innerHTML = `Game ${winner}`;

        } else if (winner == "X") {

            helper.innerHTML = `Winner player-<b>${winner}</b>!!!`;
            xWins++;
            scoreX.innerHTML = `player-<b>X</b>: ${xWins}`;

        } else if (winner == "O") {

            helper.innerHTML = `Winner player-<b>${winner}</b>!!!`;
            oWins++;
            scoreO.innerHTML = `player-<b>O</b>: ${oWins}`;
        }

        if (combo) {
            for (var i = 0; i < combo.length; i++) {
                var index = combo[i];
                cells[index].classList.add("win");
            }
        }

        gameOn = false;
    }

    function resetScore() {
        oWins = 0;
        scoreO.innerHTML = `player-<b>O</b>: ${oWins}`;
        xWins = 0;
        scoreX.innerHTML = `player-<b>X</b>: ${xWins}`;

    }

});