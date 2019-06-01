'use strict';

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', submit);
});

let usersList;

getUsersList()
    .then((response) => {
        if (response) {
            usersList = Object.entries(response);
            render();
        } else {
            usersList = [];
            document.getElementById('usersList').innerHTML = 'Users list is empty';
        }
    })
    .catch((error) => console.log(error));

function submit() {
    let user = newUser();
    if (user)
        saveUser(user)
            .then((response) => {
                let id = response.name;
                usersList.push([id, user]);
                render();
            })
            .catch((error) => console.log(error));
}

function newUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    if (name && email)
        return { name, email };
}

function render() {
    let htmlEl = document.getElementById('usersList');
    htmlEl.innerHTML = '';
    let html = `
    <table>
    <thead>
    <tr><th>Name</th><th>Email</th></tr>
    </thead>
    <tbody>
    ${usersList
            .map((item) => item = `<tr><td>${item[1].name}</td><td>${item[1].email}</td></tr>`)
            .join('')}
    </tbody>
    </table>`;
    htmlEl.innerHTML = html;
}

function saveUser(user) {
    return new Promise((resolve, reject) => {
        fetch('https://test-project-5014c.firebaseio.com/promises_fetch.json',
            {
                method: 'POST',
                body: JSON.stringify(user)
            })
            .then((response) => {
                if (response.status === 200)
                    return response.json();
                else
                    throw new Error(response.status);
            })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
}

function getUsersList() {
    return new Promise((resolve, reject) => {
        fetch('https://test-project-5014c.firebaseio.com/promises_fetch.json',
            {
                method: 'GET',
            })
            .then((response) => {
                if (response.status === 200)
                    return response.json();
                else
                    throw new Error(response.status);
            })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
}