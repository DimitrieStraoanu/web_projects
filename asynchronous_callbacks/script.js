'use strict';

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', submit);
});

let customersList;

getCustomersList((error, response) => {
    if (error)
        console.log('Error getting customer list', error);
    else {
        if (response) {
            customersList = Object.entries(response);
            render();
        } else {
            customersList = [];
            document.getElementById('customersList').innerHTML = 'Customer list is empty';
        }
    }
});

function submit() {
    let customer = newCustomer();
    if (customer)
        sendCustomer(customer, (error, response) => {
            if (error)
                console.log('Error sending new customer')
            else {
                let id = response.name;
                customersList.push([id, customer]);
                clearInputs();
                render();
            }
        });
}

function getCustomersList(responseHandler) {
    serverRequest({
        method: 'GET',
        url: 'https://test-project-5014c.firebaseio.com/asynchronous_callbacks.json',
        type: 'json',
    }, (error, response) => {
        if (error)
            responseHandler(error, null);
        else
            responseHandler(null, response);
    });
}

function render() {
    let htmlEl = document.getElementById('customersList');
    htmlEl.innerHTML = '';
    let html = `
    <table>
    <thead>
    <tr><th class="name">Name</th><th class="age">Age</th></tr>
    </thead>
    <tbody>
    ${customersList
            .map((item) => item = `<tr><td class="name">${item[1].name}</td><td class="age">${item[1].age}</td></tr>`)
            .join('')}
    </tbody>
    </table>`;
    htmlEl.innerHTML = html;
}

function newCustomer() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    if (name && age)
        return { name, age };
}

function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
}

function sendCustomer(customer, responseHandler) {
    serverRequest({
        method: 'POST',
        url: 'https://test-project-5014c.firebaseio.com/asynchronous_callbacks.json',
        type: 'json',
        body: JSON.stringify(customer)
    }, (error, response) => {
        if (error)
            responseHandler(error, null);
        else
            responseHandler(null, response);
    });
}

function serverRequest(options, responseHandler) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            responseHandler(null, xhr.response);
        } else {
            responseHandler('Server error', null);
        }
    });
    xhr.addEventListener('error', () => {
        responseHandler('Network error', null);
    });
    xhr.open(options.method, options.url);
    xhr.responseType = (options.type) ? options.type : '';
    xhr.send((options.body) ? options.body : null);
}