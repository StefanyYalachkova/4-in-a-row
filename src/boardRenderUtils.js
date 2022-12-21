import { areBallObjectsEqual, getIsBallObjectEmpty } from "./boardUtils";

const getWinnerForThisRound = (board = [[]], additionalParams = {}) => {
    const { playerOneName, playerTwoName, winCount } = additionalParams;

    const roundWinner = getWinner(board, winCount);
    let winnerForThisRound = '';

    if (roundWinner.isPlayerOneBall) {
        winnerForThisRound = playerOneName;
    } else if (roundWinner.isPlayerTwoBall) {
        winnerForThisRound = playerTwoName;
    };

    return winnerForThisRound;
};

const getWinner = (boardSize, winCount) => {

    const roundWinner = (getVerticalWinnerCell(boardSize, winCount)
        || getHorizontalWinnerCell(boardSize, winCount)
        || getRightDiagonalWinnerCell(boardSize, winCount)
        || getLeftDiagonalWinnerCell(boardSize, winCount)
        || {});

    return roundWinner;
};

const initialPosition = (boardSize, winCount) => {
    return Math.max((Math.ceil(boardSize.length / 2) - 1), winCount - 1);
};

const getVerticalWinnerCell = (boardSize, winCount) => {
    let result = null;

    for (let row = initialPosition(boardSize, winCount); row < boardSize.length; row++) {
        for (let col = 0; col < boardSize[row].length; col++) {
            if (!getIsBallObjectEmpty(boardSize[row][col])) {
                let hasWinningChance = true;
                let i = 1;

                while (hasWinningChance && i < winCount) {
                    hasWinningChance = areBallObjectsEqual(boardSize[row][col], boardSize[row - i][col])
                    i++;
                };

                if (hasWinningChance) {
                    result = boardSize[row][col];
                };
            };
        };
    };

    return result;
};

const getHorizontalWinnerCell = (boardSize, winCount) => {
    let result = null;

    for (let row = 0; row < boardSize.length; row++) {
        for (let col = 0; col < (boardSize[row].length - winCount + 1); col++) {
            if (!getIsBallObjectEmpty(boardSize[row][col])) {
                let hasWinningChance = true;
                let i = 1;

                while (hasWinningChance && i < winCount) {
                    hasWinningChance = areBallObjectsEqual(boardSize[row][col], boardSize[row][col + i]);
                    i++;
                };

                if (hasWinningChance) {
                    result = boardSize[row][col];
                };
            };
        };
    };

    return result;
};

const getRightDiagonalWinnerCell = (boardSize, winCount) => {
    let result = null;

    for (let row = initialPosition(boardSize, winCount); row < boardSize.length; row++) {
        for (let col = 0; col < (boardSize[row].length - winCount + 1); col++) {
            if (!getIsBallObjectEmpty(boardSize[row][col])) {
                let hasWinningChance = true;
                let i = 1;

                while (hasWinningChance && i < winCount) {
                    hasWinningChance = areBallObjectsEqual(boardSize[row][col], boardSize[row - i][col + i]);
                    i++;
                };

                if (hasWinningChance) {
                    result = boardSize[row][col];
                };
            };
        };
    };

    return result;
};

const getLeftDiagonalWinnerCell = (boardSize, winCount) => {
    let result = null;

    for (let row = initialPosition(boardSize, winCount); row < boardSize.length; row++) {
        for (let col = initialPosition(boardSize, winCount); col < boardSize[row].length; col++) {
            if (!getIsBallObjectEmpty(boardSize[row][col])) {
                let hasWinningChance = true;
                let i = 1;

                while (hasWinningChance && i < winCount) {
                    hasWinningChance = areBallObjectsEqual(boardSize[row][col], boardSize[row - i][col - i]);
                    i++;
                };

                if (hasWinningChance) {
                    result = boardSize[row][col];
                };
            };
        };
    };

    return result;
};

export { getWinnerForThisRound };
