"use-strict"
const sectGrid = document.querySelector("#sectGrid");
const gridButton = document.querySelector("button");
let grid;

function createGrid(noOfGrid) {
    resetGrid();
    const parentGrid = document.createElement("div");
    parentGrid.classList.add("gridRow");

    for (let i = 0; i < noOfGrid; i++) {
        grid = document.createElement("div");
        grid.setAttribute("data-count",0);
        grid.style.border = "1px solid black";
        grid.style.width = `${sectGrid.offsetWidth / noOfGrid}px`;
        grid.style.height = `${sectGrid.offsetHeight / noOfGrid}px`;
        parentGrid.appendChild(grid);
    }

    for (let j = 0; j < noOfGrid; j++) {
        const cloneGrid = parentGrid.cloneNode(parentGrid);
        sectGrid.appendChild(cloneGrid);
    }

    const newGrids = document.querySelectorAll("#sectGrid .gridRow div");
    for (let newGrid in Array.from(newGrids)) {
        newGrids[newGrid].addEventListener("mouseenter", changeBackground);
    }
}

function resetGrid() {
    const oldGrid = document.querySelectorAll("#sectGrid .gridRow");
    const oldGridLength = Array.from(oldGrid).length;

    if (Array.from(oldGrid).length > 0) {
        for (let i = oldGridLength - 1; i >= 0; i--) {
            sectGrid.removeChild(oldGrid[i]);
        }
    }

    const oldGrids = document.querySelectorAll("#sectGrid .gridRow div");
    for (let oldGrid in Array.from(oldGrids)) {
        oldGrids[oldGrid].removeEventListener("mouseenter", changeBackground);
    }
}

function promptStatement() {
    let statement = "Enter the number of grid (Max 100)";
    let noOfGrid = prompt(statement, 16);

    if (noOfGrid > 100) {
        promptStatement();
    } else {
        createGrid(noOfGrid);
    }
}

function changeBackground(event) {
    let oldHoverCount = Number(event.target.getAttribute("data-count"));
    let newHoverCount = oldHoverCount + 1;

    event.target.setAttribute("data-count", newHoverCount);

    // let oldColor = "rgba(239,35,60,0.1)";
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    let oldColor = "rgba("+r+","+g+","+b+",0.1)";

    if (oldHoverCount == 0) {
        event.target.style.backgroundColor = oldColor;
    } else 
    if (oldHoverCount < 11 && oldHoverCount > 0){
        oldColor = window.getComputedStyle(event.target, null).getPropertyValue('background-color');
        let newOpacity = newHoverCount * 0.1;

        let newColor = oldColor.replace(/[^,]+(?=\))/, newOpacity);
        event.target.style.backgroundColor = newColor;
    }

}

gridButton.addEventListener("click", promptStatement);

