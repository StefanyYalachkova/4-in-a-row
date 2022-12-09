import { Grid } from "@mui/material";
import { areBallObjectsEqual, getIsBallObjectEmpty } from "./utils";

const getWinner = (board = [[]], playerOneName, playerTwoName) => {

    const winner = checkAll(board);
    let winnerForThisRound = '';

    if (winner.isPlayerOneBall) {
        winnerForThisRound = playerOneName;
    } else if (winner.isPlayerTwoBall) {
        winnerForThisRound = playerTwoName;
    };

    return winnerForThisRound;
};

const checkAll = (board) => {
    const winner = (getVerticalWinnerCell(board)
        || getHorizontalWinnerCell(board)
        || getRightDiagonalWinnerCell(board)
        || getLeftDiagonalWinnerCell(board)
        || {});

    return winner;
};

const getVerticalWinnerCell = (board) => {
    let result = null;

    for (let row = (Math.ceil(board.length / 2) - 1); row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (!getIsBallObjectEmpty(board[row][col])) {
                if (
                    areBallObjectsEqual(board[row][col], board[row - 1][col]) &&
                    areBallObjectsEqual(board[row][col], board[row - 2][col]) &&
                    areBallObjectsEqual(board[row][col], board[row - 3][col])
                ) {
                    result = board[row][col];
                };
            };
        };
    };

    return result;
};

const getHorizontalWinnerCell = (board) => {
    let result = null;

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < (board.length - 3); col++) {
            if (!getIsBallObjectEmpty(board[row][col])) {
                if (
                    areBallObjectsEqual(board[row][col], board[row][col + 1]) &&
                    areBallObjectsEqual(board[row][col], board[row][col + 2]) &&
                    areBallObjectsEqual(board[row][col], board[row][col + 3])
                ) {
                    result = board[row][col];
                };
            };
        };
    };

    return result;
};

const getRightDiagonalWinnerCell = (board) => {
    let result = null;

    for (let row = (Math.ceil(board.length / 2) - 1); row < board.length; row++) {
        for (let col = 0; col < (board.length - 3); col++) {
            if (!getIsBallObjectEmpty(board[row][col])) {
                if (
                    areBallObjectsEqual(board[row][col], board[row - 1][col + 1]) &&
                    areBallObjectsEqual(board[row][col], board[row - 2][col + 2]) &&
                    areBallObjectsEqual(board[row][col], board[row - 3][col + 3])
                ) {
                    result = board[row][col];
                };
            };
        };
    };

    return result;
};

const getLeftDiagonalWinnerCell = (board) => {
    let result = null;

    for (let row = (Math.ceil(board.length / 2) - 1); row < board.length; row++) {
        for (let col = (Math.ceil(board.length / 2) - 1); col < board.length; col++) {
            if (!getIsBallObjectEmpty(board[row][col])) {
                if (
                    areBallObjectsEqual(board[row][col], board[row - 1][col - 1]) &&
                    areBallObjectsEqual(board[row][col], board[row - 2][col - 2]) &&
                    areBallObjectsEqual(board[row][col], board[row - 3][col - 3])
                ) {
                    result = board[row][col];
                };
            };
        };
    };

    return result;
};

export { getWinner };
