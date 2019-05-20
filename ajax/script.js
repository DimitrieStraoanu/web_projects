"use strict";

window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sendBtn").addEventListener("click", sendData);
    document.getElementById("cancelBtn").addEventListener("click", function(){
        editModeToggle("off");
        helper.innerHTML = "Canceled.";

    });
    document.getElementById("textArea").addEventListener("keyup", sendData);
    var displayArea = document.getElementById("displayArea");
    var helper = document.getElementById("helper");
});

var itemId;
var receivedData;
var editMode;
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
        } else
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
        <td><button data-id="${itemList[i][0]}" class="editBtn">Edit</button></td>
        <td><button data-id="${itemList[i][0]}" class="deleteBtn">Delete</button></td>
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
    var editButtons = document.getElementsByClassName("editBtn");
    for (var i = 0; i < deleteButtons.length; i++) {
        editButtons[i].addEventListener("click", editData);
    }
}

function editModeToggle(mode) {
    if (mode === "off") {
        editMode = false;
        document.getElementById("sendBtn").innerHTML = "Send data"
        document.getElementById("textArea").value = "";
        document.getElementById("cancelBtn").style.display ="none";
        
    } else if (mode === "on") {
        editMode = true;
        document.getElementById("sendBtn").innerHTML = "Save"
        document.getElementById("cancelBtn").style.display ="initial";
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
                } else
                    helper.innerHTML = "Error sending data.";
            });
            if (editMode) {
                myRequest.open("PUT", `https://test-project-5014c.firebaseio.com/test_data/${itemId}.json`, true);
                myRequest.send(inputData);
                editModeToggle("off");
            } else {
                myRequest.open("POST", `https://test-project-5014c.firebaseio.com/test_data.json`, true);
                myRequest.send(inputData);
                document.getElementById("textArea").value = "";
            }
        } else
            helper.innerHTML = "Input data to send.";
    }
}

function deleteData(e) {
    if (!editMode) {
        itemId = e.currentTarget.dataset.id;
        var myRequest = new XMLHttpRequest;
        myRequest.addEventListener("load", function () {
            if (this.readyState === 4 && this.status === 200) {
                helper.innerHTML = "Data deleted.";
                getData();
            } else
                helper.innerHTML = "Error deleting data.";
        });
        myRequest.open("DELETE", `https://test-project-5014c.firebaseio.com/test_data/${itemId}.json`, true);
        myRequest.send();
    }else
    helper.innerHTML = "Exit edit mode first.";
}

function editData(e) {
    editModeToggle("on");
    itemId = e.currentTarget.dataset.id;
    document.getElementById("textArea").value = receivedData[itemId];
}