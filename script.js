// default
let canvasSize = 32;
let gridElementAmounts = canvasSize*canvasSize;

// render canvas each time
// the grid
const grid = document.querySelector(".grid");


// four buttons
const singleColorBtn = document.querySelector(".single-color");
const colorInput = document.querySelector(".color-input");

const rainbowColorBtn = document.querySelector(".rainbow-color");
const funkyColorBtn = document.querySelector(".funky-color");
const clearCanvasBtn = document.querySelector(".clear-canvas");

// single or rainbow or funky color mode
let coloringMode = "singleColor";

// slider
const slider = document.querySelector("#slider-input");



let colorRightNow = colorInput.value;

// 1. render grid 
function renderGrid() {
    grid.style.gridTemplateRows = `repeat(${canvasSize}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;
    
    for (let index = 0; index < gridElementAmounts; index++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add("grid-element");
        gridElement.addEventListener("mouseover", (e) => {
            if (coloringMode === "rainbowColor") {
                gridElement.classList.remove("funky");
                rainbowColor();
                gridElement.style.backgroundColor = colorRightNow;
            }
            else if (coloringMode === "funkyColor") {
                gridElement.classList.add("funky");
            }
            else {
                gridElement.classList.remove("funky");
                gridElement.style.backgroundColor = colorRightNow;
            }
            
            gridElement.classList.add("colored");
        });

        grid.appendChild(gridElement);
    }
}
renderGrid();
function deleteOldGrid() {
    const deletedGridElements = document.getElementsByClassName(".colored");
    [].forEach.call(deletedGridElements, (element) => {
        element.remove();
    });
}

// 2. give functionality to all buttons
function pickColorHandler(event) {
    colorRightNow = event.target.value;

    singlecolor();

    deleteOldGrid();
    renderGrid();
}
function singlecolor(event) {
    coloringMode = "singleColor";
    
    if(event.target.hasChildNodes()){
        colorRightNow = event.target.querySelector(".color-input").value;
    }
    
    removeClickedClassFromBtns();
    singleColorBtn.classList.add("clicked");

}
singleColorBtn.addEventListener("click", singlecolor);
colorInput.addEventListener("change", pickColorHandler)


function removeClickedClassFromBtns() {
    document.querySelectorAll(".btn").forEach((element) => {
        element.classList.remove("clicked");
    });
}

function rainbowColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    colorRightNow = `rgb(${red}, ${green}, ${blue})`;
}
function rainbowColorHandler(event) {
    coloringMode = "rainbowColor";
    
    removeClickedClassFromBtns();
    rainbowColorBtn.classList.add("clicked");
    
    deleteOldGrid();
    renderGrid();
}
rainbowColorBtn.addEventListener("click", rainbowColorHandler);

function funkyColorHandler(event) {
    coloringMode = "funkyColor";

    removeClickedClassFromBtns();
    funkyColorBtn.classList.add("clicked");

    deleteOldGrid();
    renderGrid();
}
funkyColorBtn.addEventListener("click", funkyColorHandler);


function deleteAllGridElements() {
    document.querySelectorAll(".grid-element").forEach((element) => {
        element.remove();
    });
}
function clearCanvasHandler(event) {
    deleteAllGridElements();

    renderGrid();
}
clearCanvasBtn.addEventListener("click", clearCanvasHandler);

function sliderHandler(event) {
    canvasSize = event.target.value;
    gridElementAmounts = canvasSize * canvasSize;

    deleteAllGridElements();

    renderGrid();
}
slider.addEventListener("change", sliderHandler);

// 3. give functionality to slider




