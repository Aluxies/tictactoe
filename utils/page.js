import {
    initMatrix, placeCircle, placeCross,
    checkLines, checkColumns, checkDiagonals
} from "./game.js";

const ticTacToeGridId = "ticTacToe-grid";
const pageGrid = document.getElementById(ticTacToeGridId);
const message = document.getElementById("message");
const rounds = document.getElementById("rounds");

const countLines = 3;
const countColumns= 3;

const maxRounds = countLines * countColumns;
let countRounds = 0;

const circlePath = "./assets/circle.svg";
const crossPath = "./assets/cross.svg";

let isCrossToPlay = true;
let currentPath = crossPath;
let currentName = "cross";

const matrix = [];

function initGame() {
    initPageGrid()
    initMatrix(matrix, countLines, countColumns);
}


function initPageGrid() {
    for ( let i=0; i<countLines; i++) {
        const row = document.createElement("tr");
        for (let j=0; j<countColumns; j++) {
            const cell = document.createElement("td");

            const cellContent = document.createElement("div");
            cellContent.className = "td-content";
            cellContent.id = `data-${i}${j}`;
            cellContent.dataset.x = `${i}`;
            cellContent.dataset.y = `${j}`;
            cell.appendChild(cellContent);
            addCellListeners(cellContent);
            row.appendChild(cell);
        }
        pageGrid.appendChild(row);
    }
}

function addCellListeners(cell) {
    cell.addEventListener("click", onDataClick );
    /*cell.addEventListener("mouseover", onDataMouseOver);
    cell.addEventListener("mouseout", onDataMouseOut);*/
}

function removeCellListeners(cell) {
    cell.removeEventListener("click", onDataClick);
    /*cell.removeEventListener("mouseover", onDataMouseOver);
    cell.removeEventListener("mouseout", onDataMouseOut);*/
}

/*function onDataMouseOver(e) {
    displayPreview(e.currentTarget);
}

function onDataMouseOut(e) {
    removePreview(e.currentTarget)
}

function displayPreview(element) {

    const name = "preview";
    const opacity = 0.5;
    displayCrossOrCircle(element, name, opacity);
}

function removePreview(element) {
    const preview = document.getElementById(`${element.id}-preview`);

    if (preview) {
        element.removeChild(preview);
    }
}*/

function placeCrossOrCircle(element) {
    const opacity = 1;
    displayCrossOrCircle(element, currentName, opacity);
}

function displayCrossOrCircle(element, name, opacity) {
    const img = document.createElement("img");
    img.id = `${element.id}-${name}`;
    img.className = name;
    img.src = currentPath;
    img.alt = currentPath;
    img.style.opacity = `${opacity}`;

    element.innerHTML = img.outerHTML;

    let {x, y} = element.dataset;
    x = parseInt(x);
    y = parseInt(y);

    if (isCrossToPlay) {
        placeCross(matrix, x, y);
    } else {
        placeCircle(matrix, x, y);
    }
}

function onDataClick(e) {
    placeCrossOrCircle(e.target);
    toggleIsCrossToPlay();
    countRounds++;
    printRounds();
    printWinner();
    if (countRounds === maxRounds) {
        message.innerHTML = "The end !";
    } else {
        printCrossToPlay();
    }
    // removePreview(e.currentTarget)
    removeCellListeners(e.currentTarget);
}

function toggleIsCrossToPlay() {
    isCrossToPlay = !isCrossToPlay;
    if (isCrossToPlay) {
        currentName = "cross";
        currentPath = crossPath;
    } else {
        currentName = "circle";
        currentPath = circlePath;
    }
}

function printCrossToPlay() {
    if (isCrossToPlay) {
        message.innerHTML = "Cross's turn !";
    } else {
        message.innerHTML = "Circle's turn !";
    }
}

function printWinner() {
    if (countRounds < 5) return;
    let result;
    result = checkLines(matrix, countLines, countColumns);
    if (result.hasWinner) {
        message.innerHTML = `${result.winner} is the winner !`;
        return;
    }
    result = checkColumns(matrix, countLines, countColumns);
    if (result.hasWinner) {
        message.innerHTML = `${result.winner} is the winner !`;
        return;
    }
    result = checkDiagonals(matrix, countLines, countColumns);
    if (result.hasWinner) {
        message.innerHTML = `${result.winner} is the winner !`;
        return;
    }

}

function printRounds() {
    rounds.innerHTML = `${countRounds} rounds`;
}

export { initGame };