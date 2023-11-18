let slider = document.getElementById("myRange");
let sliderOutput = document.querySelector(".gridVal");
let gridDiv = document.querySelector(".Grid");
let borderChecker = document.querySelector("#gridLines");
let allGridElements = document.querySelectorAll(".gridElement");
let body = document.querySelector("body");
let html = document.querySelector("html");
let colorGetter = document.querySelector("#colorGrab")

sliderOutput.innerHTML = `${slider.value} x ${slider.value}`; // Display the default slider value
createGrid(Number(slider.value));

slider.oninput = function () {
  sliderOutput.innerHTML = `${this.value} x ${this.value}`;
  gridDiv.innerHTML = "";
  createGrid(Number(slider.value));
};

borderChecker.oninput = function () {
  let divList = document.querySelectorAll(".gridElement");
  divList.forEach((node) => {
    node.classList.toggle("noBorder");
  });
  gridDiv.classList.toggle("noBorder");
};

/*
Figure out getting input value from radio buttons and slider
Create your grid asynchronously
Make sure gridLines work
Painting and erasing the grid
Color methods
*/

function getNumericStyle(val) {
  let array = val.split("");
  let newArray = array.filter((x) => {
    if (Number(x) || Number(x) === 0) {
      return true;
    }
    return false;
  });
  return newArray.join("");
}

function createGrid(SliderVal) {
  let i = 0;
  while (i < SliderVal * SliderVal) {
    let div = document.createElement("div");
    div.classList.add("gridElement");
    div.style = `width:${
      Number(getNumericStyle(gridDiv.style.width)) / SliderVal
    }px; height:${Number(getNumericStyle(gridDiv.style.height)) / SliderVal}px`;
    gridDiv.appendChild(div);
    i++;
  }
  allGridElements = document.querySelectorAll(".gridElement");
}

allGridElements.forEach(function (div) { // Add reactive divs
  div.addEventListener("mousedown", function mdown(e) {
    setBgColor(e);
    allGridElements.forEach(function (minidiv) {
      minidiv.addEventListener("mousemove", setBgColor);
      minidiv.addEventListener("mouseup", function (e) {
        allGridElements.forEach(function (microdiv) {
          microdiv.removeEventListener("mousemove", setBgColor);
        });
      });
    });
  });
});
body.addEventListener("mouseup", function () {
  allGridElements.forEach(function (picodiv) {
    picodiv.removeEventListener("mousemove", setBgColor);
  });
});
body.addEventListener("mousedown", function () {
  allGridElements.forEach(function (smalldiv) {
    smalldiv.addEventListener("mousemove", setBgColor);
  });
});
body.addEventListener("mouseleave", function (e) {
  allGridElements.forEach(function (picodiv) {
    picodiv.removeEventListener("mousemove", setBgColor);
  });
});

// Set colors

function setBgColor(event) {

  event.target.style.backgroundColor = colorGetter.value;
}


