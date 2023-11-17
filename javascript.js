let slider = document.getElementById("myRange");
let sliderOutput = document.querySelector(".gridVal");
let gridDiv = document.getElementById("Grid");
let borderChecker = document.querySelector("#gridLines");
// let radio = document.querySelector('input[name="same"]:checked').value;

sliderOutput.innerHTML = `${slider.value} x ${slider.value}`; // Display the default slider value

slider.oninput = function () {
  sliderOutput.innerHTML = `${this.value} x ${this.value}`;
  gridDiv.innerHTML = "";
  createGrid(Number(slider.value));
};

borderChecker.addEventListener("onclick", function() {
    console.log(borderChecker.checked);
    return borderChecker.checked
})

/*
Figure out getting input value from radio buttons and slider
Create your grid asynchronously
Make sure gridLines work
Painting and erasing the grid
Color methods
*/

function getNumericStyle(val) {
    let array = val.split("")
    let newArray = array.filter((x) => {
        if (Number(x) || Number(x) === 0) {
            return true
        }
        return false
    })
    return newArray.join("")
}

function createGrid(SliderVal) {
  let i = 0;
  while (i < (SliderVal * SliderVal)) {
    let div = document.createElement("div");
    div.classList.add("gridElement");
    div.style = `width:${Number(getNumericStyle(gridDiv.style.width))/SliderVal}px; height:${Number(getNumericStyle(gridDiv.style.height))/SliderVal}px`;
    gridDiv.appendChild(div);
    i++;
  }
}
