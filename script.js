const cellsElements = document.querySelectorAll('[data-cell]');
const boardElement = document.querySelector('[data-board]');
const message = document.getElementById("message");
const messageElement = document.getElementById("message-data");
const restartButton = document.getElementById("restart-button");

let isCrossToPlay;
let countRounds;
let result;
let isGameFinished;

startGame();

function startGame() {
    isCrossToPlay = true;
    countRounds = 0;
    result = null;
    isGameFinished = false;
    setBoardIsCrossToPlay();

    cellsElements.forEach(cellElement => {
        cellElement.removeEventListener("click", cellHandler);
        cellElement.className = "cell";
        cellElement.dataset.isCross = undefined;
    });

    cellsElements.forEach(cellElement => {
        cellElement.addEventListener("click", cellHandler, {once: true});
    });
}

function restartHandler() {
    message.style.display = "none";
    messageElement.innerHTML = "";
    startGame();
}

function cellHandler(e) {
    if (isGameFinished) return;
    placeCrossOrCircle(e.currentTarget);
    incrementCountRounds();

    if (countRounds >= 5) {
        result = checkLines(cellsElements);
        if (result.hasWinner) {
            finishGame(result);
            return;
        }
        result = checkColumns(cellsElements);
        if (result.hasWinner) {
            finishGame(result);
            return;
        }
        result = checkDiagonals(cellsElements);
        if (result.hasWinner) {
            finishGame(result);
            return;
        }
    }

    if (countRounds === 9) {
        messageElement.innerHTML = `Nobody has won..`;
        finishGame(result);
        return;
    }
    toggleIsCrossToPlay();
    setBoardIsCrossToPlay();
}

function setBoardIsCrossToPlay() {
    boardElement.dataset.isCrossToPlay = isCrossToPlay;
    boardElement.className = `board ${isCrossToPlay ? "cross" : "circle"}`;
}

function toggleIsCrossToPlay() {
    isCrossToPlay = !isCrossToPlay;
}

function incrementCountRounds() {
    countRounds++;
}

function placeCrossOrCircle(element) {
    element.dataset.isCross = isCrossToPlay;
    element.className += isCrossToPlay ? " cross" : " circle";
}

function finishGame(result) {
    message.style.display = "flex";
    if (result.hasWinner) {
        messageElement.innerHTML = `The winner is ${result.winner} !`;
    }
    isGameFinished = true;
    cellsElements.forEach(element => {
       element.className += " disabled";
    });
    restartButton.onclick = restartHandler;
}

// Game functions

const countLines= cellsElements.length/3;
const countColumns= cellsElements.length/3;
const countToWin= 3;

function determineWinner(countCircle, countCross) {
    const result = { hasWinner : false, winner : "" };
    if (countCross === countToWin) {
        result.hasWinner = true;
        result.winner = "cross";
    } else if (countCircle === countToWin) {
        result.hasWinner = true;
        result.winner = "circle";
    }
    return result;
}

function checkLines(elements) {
    let result;
    for (let i=0; i<countLines; i++) {
        let countCross= 0;
        let countCircle= 0;
        for (let j=0; j<countColumns; j++) {
            let index= 3*i + j;
            if (elements[index].dataset.isCross === "true") {
                countCross++;
            } else if (elements[index].dataset.isCross === "false") {
                countCircle++;
            }
        }
        result = determineWinner(countCircle, countCross);
        if (result.hasWinner) return result;
    }
    return result;
}

function checkColumns(elements) {
    let result;
    for (let i=0; i<countLines; i++) {
        let countCross= 0;
        let countCircle= 0;
        for (let j=0; j<countColumns; j++) {
            let index= j*3 + i;
            if (elements[index].dataset.isCross === "true") {
                countCross++;
            } else if (elements[index].dataset.isCross === "false") {
                countCircle++;
            }
        }
        result = determineWinner(countCircle, countCross);

        if (result.hasWinner) return result;
    }
    return result;
}

function checkDiagonals(elements) {
    let result;
    let countCross= 0;
    let countCircle= 0;
    for (let i=0; i<countLines; i++) {
        let index= i*4;
        if (elements[index].dataset.isCross === "true") {
            countCross++;
        } else if (elements[index].dataset.isCross === "false") {
            countCircle++;
        }
    }
    result = determineWinner(countCircle, countCross);

    if (result.hasWinner) return result;

    countCross= 0;
    countCircle= 0;

    for (let i=0; i<countLines; i++) {
        let index= i*2 + 2;
        if (elements[index].dataset.isCross === "true") {
            countCross++;
        } else if (elements[index].dataset.isCross === "false") {
            countCircle++;
        }
    }

    result = determineWinner(countCircle, countCross);

    return result;
}