"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {

  document.getElementById("sendFormBtn").addEventListener("click", sendForm);
  document.getElementById("resetFormBtn").addEventListener("click", resetForm);
  document.getElementById("signUpForm").addEventListener("input", validateForm);
}


function validateForm(event) {

  var errors;
  var firstName = document.getElementById("firstName");
  var lastName = document.getElementById("lastName");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirmPassword");
  var email = document.getElementById("email");

  if (event.target.id === "firstName" || event.target.id === "sendFormBtn") {

    if (/^[a-z A-Z]+$/.test(firstName.value) === false) {

      firstName.parentElement.classList.add("redBorder");
      firstName.parentElement.querySelector(".hintMsg").innerText = "Enter a valid name!"
      firstName.parentElement.querySelector(".hintMsg").classList.add("redText");
      errors = true;

    } else {

      firstName.parentElement.classList.remove("redBorder");
      firstName.parentElement.querySelector(".hintMsg").innerText = "Ok!"
      firstName.parentElement.querySelector(".hintMsg").classList.remove("redText");
      errors = false;
    }
  }

  if (event.target.id === "lastName" || event.target.id === "sendFormBtn") {

    if (/^[a-z A-Z]+$/.test(lastName.value) === false) {

      lastName.parentElement.classList.add("redBorder");
      lastName.parentElement.querySelector(".hintMsg").innerText = "Enter a valid name!"
      lastName.parentElement.querySelector(".hintMsg").classList.add("redText");
      errors = true;

    } else {

      lastName.parentElement.classList.remove("redBorder");
      lastName.parentElement.querySelector(".hintMsg").innerText = "Ok!"
      lastName.parentElement.querySelector(".hintMsg").classList.remove("redText");
      errors = false;
    }
  }
  return errors;

}

function sendForm(event) {

  event.preventDefault();

  if (!validateForm(event)) {
    console.log("There it goes!");
  } else {
    console.log("Hold on partner!");
  }
}

function resetForm(event) {

  event.preventDefault();
  document.getElementById("signUpForm").reset();
  var elements = document.querySelectorAll(".formInput, .hintMsg");
  elements = Array.from(elements);
  elements.forEach(function (item) {
    item.classList.remove("redBorder");
    if (item.tagName === "P") {
      item.classList.remove("redText");
      item.innerText = "";
    }
  })
}

