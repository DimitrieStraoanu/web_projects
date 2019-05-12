"use strict";

var testArea = document.querySelector(".testArea");
var resetBtn = document.querySelector("#resetBtn");
var theTimer = document.querySelector(".timer p");
var testText = document.querySelector(".testText p").innerHTML;

testArea.addEventListener("beforeinput", startTimer);
testArea.addEventListener("input", spellCheck);
resetBtn.addEventListener("click", reset);

var interval;
var timer = [0, 0, 0, 0];
var timerRuning = false;

function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

function runTimer() {
  var currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;
  timer[0] = Math.floor((timer[3] / 100) / 60);
  timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
  timer[2] = Math.floor((timer[3]) - (timer[1] * 100) - (timer[0] * 6000));
}

function startTimer(event) {
  if (testArea.value.length === 0 && !timerRuning) {
    interval = setInterval(runTimer, 10);
    timerRuning = true;
  }
}

function spellCheck(event) {
  var inputText = testArea.value;
  if (inputText == testText) {
    testArea.style.cssText = "border-color: green;";
    clearInterval(interval);
  } else if (inputText == testText.substring(0, inputText.length)) {
    testArea.style.cssText = "border-color: lightblue;";
  } else {
    testArea.style.cssText = "border-color: rgb(185, 54, 54);";
  }
}

function reset(event) {
  clearInterval(interval);
  timer = [0, 0, 0, 0];
  timerRuning = false;
  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testArea.style.cssText = "border-color: grey;";
  testArea.focus();
}

