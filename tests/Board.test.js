import React from "react";
import renderer from 'react-test-renderer';
import { Board } from "../src/Board";

describe('Board test', () => {
    it('renders correctly', () => {
        const restartGame = false;
        const boardSize = { row: 8, col: 8 }
        const rowSize = boardSize.row;
        const colSize = boardSize.col;
        const runOnUpdate = jest.fn();
        const displayBoard = jest.fn();
        const handleMoveDown = jest.fn();
        const handleIsLastCellFull = jest.fn();
        const getInjectedComponent = jest.fn();

        const tree = renderer
            .create(<Board
                restartGame={restartGame}
                boardSize={boardSize}
                rowSize={rowSize}
                colSize={colSize}
                runOnUpdate={runOnUpdate}
                displayBoard={displayBoard}
                handleMoveDown={handleMoveDown}
                handleIsLastCellFull={handleIsLastCellFull}
                getInjectedComponent={getInjectedComponent}
            />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});