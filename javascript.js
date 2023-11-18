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
let penButton = document.querySelector("#pen")
let rainbowButton = document.querySelector("#rainbowMode")
let eraser = document.querySelector("#eraser")
let shader = document.querySelector("#shader")
let lighter = document.querySelector("#lighten")
const buttonsArray = [penButton, rainbowButton, eraser, shader, lighter]

let penmode = "pen"

buttonsArray.forEach(function(button) {
  button.oninput = function () {
    penmode = button.value;
    console.log(penmode);
  } 
})

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
      minidiv.addEventListener("mouseover", setGridElementColor);
      minidiv.addEventListener("mouseup", function (e) {
        allGridElements.forEach(function (microdiv) {
          microdiv.removeEventListener("mouseover", setGridElementColor);
        });
      });
    });
  });
});
body.addEventListener("mouseup", function () {
  allGridElements.forEach(function (picodiv) {
    picodiv.removeEventListener("mouseover", setGridElementColor);
  });
});
html.addEventListener("mousedown", function () {
  allGridElements.forEach(function (smalldiv) {
    smalldiv.addEventListener("mouseover", setGridElementColor);
  });
});
body.addEventListener("mouseleave", function (e) {
  allGridElements.forEach(function (picodiv) {
    picodiv.removeEventListener("mouseover", setGridElementColor);
  });
});
html.addEventListener("contextmenu", function() {
  allGridElements.forEach(function(element) {
    element.removeEventListener("mouseover", setGridElementColor)
  })
})

// Set colors

function setGridElementColor(event) {

  if (penmode === "pen") {
    event.target.style.backgroundColor = colorGetter.value;
  }
  else if (penmode === "eraser") {
    event.target.style.backgroundColor = bgColorGetter.value;
  }
  else if (penmode === "rainbow") {
    event.target.style.backgroundColor = getRandomColor();
  }
  else if (penmode === "shader") {
    
  }

}

function setGridBgcolor() {
  gridDiv.style.backgroundColor = bgColorGetter.value
}

function getRandomColor() {
  const rainbowColors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"]
  const randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  return randomColor;
}