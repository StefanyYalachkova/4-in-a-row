import { Grid } from "@mui/material";
import { areBallObjectsEqual, getIsBallObjectEmpty } from "./utils";

const getWinner = (board = [[]], additionalParams = {}) => {
    const { playerOneName, playerTwoName, nInARow } = additionalParams;

    const winner = checkAll(board, nInARow);
    let winnerForThisRound = '';

    if (winner.isPlayerOneBall) {
        winnerForThisRound = playerOneName;
    } else if (winner.isPlayerTwoBall) {
        winnerForThisRound = playerTwoName;
    };

    return winnerForThisRound;
};

const checkAll = (board, nInARow) => {

    const winner = (getVerticalWinnerCell(board, nInARow)
        || getHorizontalWinnerCell(board, nInARow)
        || getRightDiagonalWinnerCell(board, nInARow)
        || getLeftDiagonalWinnerCell(board, nInARow)
        || {});

    return winner;
};
const getVerticalWinnerCell = (board, nInARow) => {
    let result = null;

    for (let row = Math.max((Math.ceil(board.length / 2) - 1), nInARow - 1); row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (!getIsBallObjectEmpty(board[row][col])) {
                let hasWinningChance = true;
                let i = 1;

                while (hasWinningChance && i < nInARow) {
                    hasWinningChance = areBallObjectsEqual(board[row][col], board[row - i][col])
                    i++;
                };

                if (hasWinningChance) {
                    result = board[row][col];
                };
            };
        };
    };

    return result;
};

const getHorizontalWinnerCell = (board, nInARow) => {
    let result = null;

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < (board[row].length - nInARow + 1); col++) {
            if (!getIsBallObjectEmpty(board[row][col])) {
                let hasWinningChance = true;
                let i = 1;

                while (hasWinningChance && i < nInARow) {
                    hasWinningChance = areBallObjectsEqual(board[row][col], board[row][col + i]);
                    i++;
                };

                if (hasWinningChance) {
                    result = board[row][col];
                };
            };
        };
    };

    return result;
};

const getRightDiagonalWinnerCell = (board, nInARow) => {
    let result = null;

    for (let row = Math.max((Math.ceil(board.length / 2) - 1), nInARow - 1); row < board.length; row++) {
        for (let col = 0; col < (board[row].length - nInARow + 1); col++) {
            if (!getIsBallObjectEmpty(board[row][col])) {
                let hasWinningChance = true;
                let i = 1;

                while (hasWinningChance && i < nInARow) {
                    hasWinningChance = areBallObjectsEqual(board[row][col], board[row - i][col + i]);
                    i++;
                };

                if (hasWinningChance) {
                    result = board[row][col];
                };
            };
        };
    };

    return result;
};

const getLeftDiagonalWinnerCell = (board, nInARow) => {
    let result = null;

    for (let row = (Math.max((Math.ceil(board.length / 2) - 1), nInARow - 1)); row < board.length; row++) {
        for (let col = (Math.max((Math.ceil(board.length / 2) - 1), nInARow - 1)); col < board[row].length; col++) {
            if (!getIsBallObjectEmpty(board[row][col])) {
                let hasWinningChance = true;
                let i = 1;

                while (hasWinningChance && i < nInARow) {
                    hasWinningChance = areBallObjectsEqual(board[row][col], board[row - i][col - i]);
                    i++;
                };

                if (hasWinningChance) {
                    result = board[row][col];
                };
            };
        };
    };

    return result;
};

export { getWinner };
