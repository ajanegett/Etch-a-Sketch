let slider = document.getElementById("myRange");
let sliderOutput = document.querySelector(".gridVal");
let gridDiv = document.querySelector(".Grid");
let borderChecker = document.querySelector("#gridLines");
let allGridElements = document.querySelectorAll(".gridElement");
let body = document.querySelector("body");
let html = document.querySelector("html");
let colorGetter = document.querySelector("#colorGrab")
let bgColorGetter = document.querySelector("#BgGrab")
let clearButton = document.querySelector("#clear")

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

bgColorGetter.oninput = function() {
  setGridBgcolor()
}

clearButton.onclick = function() {
  gridDiv.innerHTML = "";
  createGrid(Number(slider.value));
}

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
    setGridElementColor(e);
    allGridElements.forEach(function (minidiv) {
      minidiv.addEventListener("mousemove", setGridElementColor);
      minidiv.addEventListener("mouseup", function (e) {
        allGridElements.forEach(function (microdiv) {
          microdiv.removeEventListener("mousemove", setGridElementColor);
        });
      });
    });
  });
});
body.addEventListener("mouseup", function () {
  allGridElements.forEach(function (picodiv) {
    picodiv.removeEventListener("mousemove", setGridElementColor);
  });
});
html.addEventListener("mousedown", function () {
  allGridElements.forEach(function (smalldiv) {
    smalldiv.addEventListener("mousemove", setGridElementColor);
  });
});
body.addEventListener("mouseleave", function (e) {
  allGridElements.forEach(function (picodiv) {
    picodiv.removeEventListener("mousemove", setGridElementColor);
  });
});
html.addEventListener("contextmenu", function() {
  allGridElements.forEach(function(element) {
    element.removeEventListener("mousemove", setGridElementColor)
  })
})

// Set colors

function setGridElementColor(event) {

  event.target.style.backgroundColor = colorGetter.value;
}

function setGridBgcolor() {
  gridDiv.style.backgroundColor = bgColorGetter.value
}