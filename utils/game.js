const defaultId = 0;
const crossId = 1;
const circleId = 2;
const countToWin = 3;

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

function checkLines(matrix, countLines, countColumns) {
    let result;
    for (let i=0; i<countColumns; i++) {
        let countCross = 0;
        let countCircle = 0;
        for (let j=0; j<countColumns; j++) {
            if (matrix[i][j] === crossId) {
                countCross++;
            } else if (matrix[i][j] === circleId) {
                countCircle++;
            }
        }
        result = determineWinner(countCircle, countCross);

        if (result.hasWinner) return result;
    }
    return result;
}

function checkColumns(matrix, countLines, countColumns) {
    let result;
    for (let i=0; i<countLines; i++) {
        let countCross = 0;
        let countCircle = 0;
        for (let j=0; j<countColumns; j++) {
            if (matrix[j][i] === crossId) {
                countCross++;
            } else if (matrix[j][i] === circleId) {
                countCircle++;
            }
        }
        result = determineWinner(countCircle, countCross);

        if (result.hasWinner) return result;
    }
    return result;
}

function checkDiagonals(matrix, countLines, countColumns) {

}

function initMatrix(matrix, countLines, countColumns) {
    const line = [];
    for (let i=0; i<countLines; i++) {
        for (let j=0; j<countColumns; j++) {
            line[j] = {id: defaultId};
        }
        matrix.push(line);
    }
}

function placeCross(matrix, x, y) {
    matrix[x][y].id = crossId;
}

function placeCircle(matrix, x, y) {
    matrix[x][y].id = circleId;
}

export { initMatrix, placeCross, placeCircle, checkLines, checkColumns, checkDiagonals };