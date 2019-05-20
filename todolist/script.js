window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addBtn").addEventListener("click", addTodo);
});

var firebaseConfig = {
    apiKey: "AIzaSyCX7G8Pk07l4Mx2SBmG6FISOeAhTnjA6U4",
    authDomain: "test-project-5014c.firebaseapp.com",
    databaseURL: "https://test-project-5014c.firebaseio.com",
    projectId: "test-project-5014c",
    storageBucket: "test-project-5014c.appspot.com",
    messagingSenderId: "845094528318",
    appId: "1:845094528318:web:8a40ead1cedf574e"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database().ref("todolist");

function addTodo() {
    var todoInput = document.getElementById("todoInput");
    var todo = todoInput.value.trim();
    if (todo) {
        database.push(todo);
        todoInput.value = "";
    }
}