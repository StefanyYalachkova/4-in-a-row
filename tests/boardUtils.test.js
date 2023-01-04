import { areBallObjectsEqual, DisplayBall, getBoardInitialState, getIsBallObjectEmpty } from "../src/boardUtils";
import renderer from 'react-test-renderer';
import { render } from "@testing-library/react";
import { SVGBallPlayer1 } from "../src/SVGBallPlayer1";
import { SVGBallPlayer2 } from "../src/SVGBallPlayer2";

describe("getIsBallObjectEmpty", () => {
    it('checking is ball object empty', () => {
        expect(getIsBallObjectEmpty({ isPlayerOneBall: false, isPlayerTwoBall: false })).toBe(true);
        expect(getIsBallObjectEmpty({ isPlayerOneBall: true, isPlayerTwoBall: false })).toBe(false);
    });
});

describe("areBallObjectsEqual", () => {
    it('checking are ball objects equal', () => {
        expect(areBallObjectsEqual({ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: true, isPlayerTwoBall: false })).toBe(true);
        expect(areBallObjectsEqual({ isPlayerOneBall: true, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false })).toBe(false);
    });
});

describe("getBoardInitialState", () => {
    it('checking board initial state', () => {
        const expectedResult = [
            [{ isPlayerOneBall: false, isPlayerTwoBall: false }, { isPlayerOneBall: false, isPlayerTwoBall: false }]
        ];
        expect(getBoardInitialState(1, 2)).toEqual(expectedResult);
    });
    it('checking board with empty array', () => {
        const emptyArray = [];
        expect(getBoardInitialState(0, 0)).toEqual(emptyArray);
    });
});

describe('DisplayBall', () => {
    it('renders correctly PlayerOneBall', () => {
        const element = { isPlayerOneBall: true, isPlayerTwoBall: false };
        let result = (
            <svg>
                <circle
                    cx="12" cy="12" r="8"
                    strokeWidth="6" stroke="white"
                    fill="white"
                />
            </svg>
        );

        if (element.isPlayerOneBall || element.isPlayerTwoBall) {
            result = (
                element.isPlayerOneBall
                    ? <SVGBallPlayer1 />
                    : <SVGBallPlayer2 />
            );
        };

        const tree = renderer
            .create(<DisplayBall element={element} result={result} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders correctly isPlayerTwoBall', () => {
        const element = { isPlayerOneBall: false, isPlayerTwoBall: true };
        let result = (
            <svg>
                <circle
                    cx="12" cy="12" r="8"
                    strokeWidth="6" stroke="white"
                    fill="white"
                />
            </svg>
        );

        if (element.isPlayerOneBall || element.isPlayerTwoBall) {
            result = (
                element.isPlayerOneBall
                    ? <SVGBallPlayer1 />
                    : <SVGBallPlayer2 />
            );
        };

        const tree = renderer
            .create(<DisplayBall element={element} result={result} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders correctly empty circle', () => {
        const element = { isPlayerOneBall: false, isPlayerTwoBall: false };
        let result = (
            <svg>
                <circle
                    cx="12" cy="12" r="8"
                    strokeWidth="6" stroke="white"
                    fill="white"
                />
            </svg>
        );

        if (element.isPlayerOneBall || element.isPlayerTwoBall) {
            result = (
                element.isPlayerOneBall
                    ? <SVGBallPlayer1 />
                    : <SVGBallPlayer2 />
            );
        };

        const tree = renderer
            .create(<DisplayBall element={element} result={result} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('displayBoard test', () => {
    it('renders correctly displayBoard', () => {
        const boardState = [
            { isPlayerOneBall: false, isPlayerTwoBall: false },
            { isPlayerOneBall: false, isPlayerTwoBall: false },
            { isPlayerOneBall: false, isPlayerTwoBall: true }
        ];
        const keyPrefix = 'board';
        const displayBoard = jest.fn();

        render(displayBoard(boardState, keyPrefix))
        expect(displayBoard).toBeCalled();
    });
});
