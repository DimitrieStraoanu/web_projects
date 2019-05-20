"use strict";

window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sendBtn").addEventListener("click", sendData);
    document.getElementById("textArea").addEventListener("keyup", sendData);
    var displayArea = document.getElementById("displayArea");
    var helper = document.getElementById("helper");
});

var itemId;
var receivedData;
getData();

function getData() {
    var myRequest = new XMLHttpRequest;
    myRequest.addEventListener("load", function () {
        if (this.readyState === 4 && this.status === 200) {
            receivedData = JSON.parse(this.responseText);
            if (receivedData) {
                helper.innerHTML = "Data received.";
                renderData();
            } else {
                displayArea.innerHTML = "";
                helper.innerHTML = "Database empty.";
            }
        }
        else
            helper.innerHTML = "Error receiving data.";
    });
    myRequest.open("GET", "https://test-project-5014c.firebaseio.com/test_data.json", true);
    myRequest.send();
}

function renderData() {
    var itemList = Object.entries(receivedData);
    var myListHtml = "";
    for (var i = 0; i < itemList.length; i++) {
        myListHtml += `
        <tr>
        <td>${[i + 1]}.</td>
        <td>${itemList[i][1]}</td>
        <td><button id="${itemList[i][0]}" class="deleteBtn">Delete</button></td>
        </tr>
        `;
    }
    displayArea.innerHTML = myListHtml;
    addListeners();
}

function addListeners() {
    var deleteButtons = document.getElementsByClassName("deleteBtn");
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteData);
    }
}

function sendData(e) {
    if (e.type === "click" || e.key === "Enter") {
        var inputData = document.getElementById("textArea").value;
        if (inputData) {
            inputData = JSON.stringify(inputData);
            var myRequest = new XMLHttpRequest;
            myRequest.addEventListener("load", function () {
                if (this.readyState === 4 && this.status === 200) {
                    helper.innerHTML = "Data sent.";
                    getData();
                }
                else
                    helper.innerHTML = "Error sending data.";
            });
            myRequest.open("POST", `https://test-project-5014c.firebaseio.com/test_data.json`, true);
            myRequest.send(inputData);

            document.getElementById("textArea").value = "";
        } else
            helper.innerHTML = "Input data to send.";
    }
}

function deleteData(e) {
    itemId = e.currentTarget.id;
    var myRequest = new XMLHttpRequest;
    myRequest.addEventListener("load", function () {
        if (this.readyState === 4 && this.status === 200) {
            helper.innerHTML = "Data deleted.";
            getData();
        }
        else
            helper.innerHTML = "Error deleting data.";
    });
    myRequest.open("DELETE", `https://test-project-5014c.firebaseio.com/test_data/${itemId}.json`, true);
    myRequest.send();
}

