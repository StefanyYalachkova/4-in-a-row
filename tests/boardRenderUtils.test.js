import { getHorizontalWinnerCell, getLeftDiagonalWinnerCell, getRightDiagonalWinnerCell, getVerticalWinnerCell, getWinner, getWinnerForThisRound, initialPosition } from "../src/boardRenderUtils";

describe("getWinnerForThisRound", () => {
    it('checking with empty params', () => {
        expect(getWinnerForThisRound([[]], {})).toBe('');
    });
    it('checking getWinnerForThisRound', () => {
        const board = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const playerOneName = 'Stef';
        const playerTwoName = 'Nasko';
        const winCount = 3;
        const additionalParams = { playerOneName, playerTwoName, winCount };
        expect(getWinnerForThisRound(board, additionalParams)).toEqual('');
    });
    it('checking getWinnerForThisRound with winner', () => {
        const board = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const playerOneName = 'Stef';
        const playerTwoName = 'Nasko';
        const winCount = 1;
        const additionalParams = { playerOneName, playerTwoName, winCount };
        expect(getWinnerForThisRound(board, additionalParams)).toEqual('Stef');
    });
});

describe("getWinner", () => {
    it('checking getWinner with empty params', () => {
        expect(getWinner({}, 0)).toEqual({});
    });
    it('checking getWinner', () => {
        const boardSize = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
        ];
        const winCount = 1;
        getVerticalWinnerCell(boardSize, winCount);
        const expectedResult = [{ "isPlayerOneBall": true, "isPlayerTwoBall": false }];
        expect([getWinner(boardSize, winCount)]).toEqual(expectedResult);
    });
});

describe("initialPosition", () => {
    it('checking initialPosition', () => {
        const boardSize = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const winCount = 2;
        const expectedResult = 1;
        expect(initialPosition(boardSize, winCount)).toEqual(expectedResult);
    });
    it('checking initialPosition with empty array', () => {
        expect(initialPosition([0], 0)).toEqual(0);
    });
});

describe("getVerticalWinnerCell", () => {
    it('checking getVerticalWinnerCell', () => {
        const boardSize = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const winCount = 1;
        const expectedResult = { "isPlayerOneBall": true, "isPlayerTwoBall": false };
        expect(getVerticalWinnerCell(boardSize, winCount)).toEqual(expectedResult);
    });
    it('checking getVerticalWinnerCell with winCount = 2', () => {
        const boardSize = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const winCount = 2;
        const expectedResult = { "isPlayerOneBall": true, "isPlayerTwoBall": false };
        expect(getVerticalWinnerCell(boardSize, winCount)).toEqual(expectedResult);
    });
    it('checking getVerticalWinnerCell with empty array', () => {
        expect(getVerticalWinnerCell([[{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]], 0)).toEqual(null);
    });
});

describe("getHorizontalWinnerCell", () => {
    it('checking getHorizontalWinnerCell', () => {
        const boardSize = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const winCount = 1;
        const expectedResult = { "isPlayerOneBall": true, "isPlayerTwoBall": false };
        expect(getHorizontalWinnerCell(boardSize, winCount)).toEqual(expectedResult);
    });
    it('checking getHorizontalWinnerCell with winCount = 2', () => {
        const boardSize = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: true, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const winCount = 2;
        const expectedResult = { "isPlayerOneBall": true, "isPlayerTwoBall": false };
        expect(getHorizontalWinnerCell(boardSize, winCount)).toEqual(expectedResult);
    });
    it('checking getHorizontalWinnerCell with empty array', () => {
        expect(getHorizontalWinnerCell([0], 0)).toEqual(null);
    });
});

describe("getRightDiagonalWinnerCell", () => {
    it('checking getRightDiagonalWinnerCell', () => {
        const boardSize = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const winCount = 1;
        const expectedResult = { "isPlayerOneBall": true, "isPlayerTwoBall": false };
        expect(getRightDiagonalWinnerCell(boardSize, winCount)).toEqual(expectedResult);
    });
    it('checking getRightDiagonalWinnerCell with winCount = 2', () => {
        const boardSize = [
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: true, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const winCount = 2;
        const expectedResult = { "isPlayerOneBall": true, "isPlayerTwoBall": false };
        expect(getRightDiagonalWinnerCell(boardSize, winCount)).toEqual(expectedResult);
    });
    it('checking getRightDiagonalWinnerCell with empty array', () => {
        expect(getRightDiagonalWinnerCell([0], 0)).toEqual(null);
    });
});

describe("getLeftDiagonalWinnerCell", () => {
    it('checking getLeftDiagonalWinnerCell', () => {
        const boardSize = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const winCount = 1;
        const expectedResult = { "isPlayerOneBall": true, "isPlayerTwoBall": false };
        expect(getLeftDiagonalWinnerCell(boardSize, winCount)).toEqual(expectedResult);
    });
    it('checking getLeftDiagonalWinnerCell with winCount = 2', () => {
        const boardSize = [
            [{ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: true, isPlayerTwoBall: false }],
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        const winCount = 2;
        const expectedResult = { "isPlayerOneBall": true, "isPlayerTwoBall": false };
        expect(getLeftDiagonalWinnerCell(boardSize, winCount)).toEqual(expectedResult);
    });
    it('checking getLeftDiagonalWinnerCell with empty array', () => {
        expect(getLeftDiagonalWinnerCell([0], 0)).toEqual(null);
    });
});