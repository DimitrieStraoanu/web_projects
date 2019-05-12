"use strict";

window.addEventListener("DOMContentLoaded", function () {

  document.getElementById("clickMe").addEventListener("click", clicked);

  function clicked(event) {
    console.log(this);
    var newP = document.createElement("P");
    newP.innerText = "Hello World!";
    newP.setAttribute("id", "hello");
    document.body.insertBefore(newP, document.body.children[0]);
  }
  //----------------------------------------------------------
  function Course(title, instructor, level, published, views) {
    this.title = title;
    this.instructor = instructor;
    this.level = level;
    this.published = published;
    this.views = views;
  }

  Course.prototype.addview = function () {
    this.views++
  };

  var course01 = new Course("Hello World!", "Mr. Web", 10, true, 5);

  course01.addview();
  console.log(course01.views);

  for (var prop in course01) {
    if (course01.hasOwnProperty(prop)) {
      console.log(prop, ":", course01[prop]);
    } else {
      console.log("from prototype:", prop, ":", course01[prop]);
    }
  }

  //--------------------------------------------------------

  function adder(x) {

    function add(y) {
      return x + y;
    }

    return add;
  }

  var addTen = adder(10);
  // console.log(addTen(5));

  var addMr = adder("Mr. ");
  // console.log(addMr("Tom"));

  function multiplyer(x) {

    function multiply(y) {
      return x * y;
    }

    return multiply;
  }

  var doubleIt = multiplyer(2);
  // console.log(doubleIt(5));

  var tripleIt = multiplyer(3);
  // console.log(tripleIt(5));

  //---------------------------------------------------

  var link = document.querySelector("a");
  link.href = "#";
  link.id = "link";
  link.classList.add("uppercase");
  link.target = "_blank";

  var newElement = document.createElement("h1");
  newElement.innerText = " I'm an important header!";
  document.body.insertBefore(newElement, document.body.children[0]);

  //----------------------------------------------------

  function merge(firstArr, secondArr) {

    var mergedArr = [];
    var i = 0;
    var j = 0;

    while (i < firstArr.length && j < secondArr.length) {

      if (firstArr[i] < secondArr[j]) {
        mergedArr.push(firstArr[i]);
        i++;
      } else {
        mergedArr.push(secondArr[j]);
        j++;
      }

    }
    while (i < firstArr.length) {
      mergedArr.push(firstArr[i]);
      i++;
    }
    while (j < secondArr.length) {
      mergedArr.push(secondArr[j]);
      j++;
    }
    return mergedArr;
  }



  function sort(arr) {
    var sorted = [];
    if (arr.length > 0) {
      if (arr.length == 1) {
        sorted = arr;
      } else {
        var midIndex = Math.floor(arr.length / 2);
        var leftArr = arr.slice(0, midIndex);
        var rightArr = arr.slice(midIndex, arr.length);
        var sortedLeft = sort(leftArr);
        var sortedRight = sort(rightArr);
        sorted = merge(sortedLeft, sortedRight);
      }
    }
    return sorted;
  }


  console.log(sort([3, 1, 8, 12, 90, 3, 5, 24, 78, 0]));

  //------------------------------------------------------
  var categories = [
    {
      name: "Europa",
      subcategory: {
        name: "Romania",
        subcategory: {
          name: "Bucuresti",
          subcategory: {
            name: "Bdul Magheru",
            subcategory: undefined
          }
        }
      }
    },
    {
      name: "categorie 1",
      subcategory: {
        name: "categorie 2",
        subcategory: {
          name: "categorie 3",
          subcategory: {
            name: "categorie 4",
            subcategory: {
              name: "categorie 5",
              subcategory: {
                name: "categorie 6",
                subcategory: undefined
              }
            }
          }
        }
      }
    }
  ];

  function displaySubcategories(obj) {
    console.log(obj);
    if (obj.subcategory != undefined) {
      displaySubcategories(obj.subcategory);
    }
  }

  displaySubcategories(categories[0]);

  var object = {
    name: 1,
    hello: {
      name: 2,
      again: {
        name: 3,
        coco: {
          name: 4,
          lolo: {
            name: 5
          }
        }
      }
    }
  }

  function displayNestedObj(obj) {
    console.log(obj);
    for (var prop in obj) {
      if (typeof (obj[prop]) === "object") {
        console.log(prop);
        displayNestedObj(obj[prop]);
      }

    }
  }

  displayNestedObj(object);

  //---------------------------------------------

  var bookText = document.querySelector(".bookText");
  var bookBtn = document.getElementById("bookBtn");
  bookText.classList.add("hide");


  function buttonClicked(ev, object) {
    console.log(ev.target);
    console.log(object);
    
    bookText.classList.toggle("hide");
    if (bookBtn.innerText == "Book Now!") {
      bookBtn.innerText = "Ooops!";
    } else {
    bookBtn.innerText = "Book Now!";
    }
  }

  bookBtn.addEventListener("click", function(ev){buttonClicked(ev, this)});
  
  var circle = document.createElement("div");
  document.body.appendChild(circle);
  circle.id = "circle";
  circle.classList.add("circle");

  document.addEventListener("mousemove", moveCircle);
  circle.addEventListener("mouseenter", mouseTouch);
  circle.addEventListener("mouseleave", mouseUnTouch);

  function moveCircle(event) {

    var mouseX = window.innerWidth - event.clientX;
    var mouseY = window.innerHeight - event.clientY;
    console.log(mouseX);
    console.log(mouseY);
    circle.style.cssText = `left:${mouseX}px; top:${mouseY}px;`;

  }

  function mouseTouch() {
    circle.classList.toggle("fancy");
  }
  function mouseUnTouch() {
    circle.classList.toggle("fancy");
  }

  //------------------------------------------

  

});

function greet(name){
  if (name){
  console.log(`Hello ${name} !`)
  } else {
    greet("sir");
  }
}
