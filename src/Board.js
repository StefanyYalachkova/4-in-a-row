import React, { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { displayBoard, getBoardInitialState, getIsBallObjectEmpty } from "./boardUtils";

const Board = (props) => {
    const { restartGame, runOnUpdate, getInjectedComponent } = props;

    let rowSize = props.boardSize.row;
    let colSize = props.boardSize.col;

    const [board, setBoard] = useState(getBoardInitialState(rowSize, colSize));

    useEffect(() => {
        if (restartGame) {
            setBoard(getBoardInitialState(rowSize, colSize));
        } else {
            runOnUpdate(board);
        };
    }, [board, restartGame]);

    const moveDownBall = (position, activeElement) => {
        const copy = [...board];
        let isTurnFinished = false;

        let startLine = copy.length - 1;

        while (startLine >= 0 && !isTurnFinished) {
            if (getIsBallObjectEmpty(copy[startLine][position])) {
                if (activeElement.isPlayerOneBall) {
                    copy[startLine][position] = { isPlayerOneBall: true, isPlayerTwoBall: false };
                } else {
                    copy[startLine][position] = { isPlayerOneBall: false, isPlayerTwoBall: true };
                }
                isTurnFinished = true;
            } else {
                startLine--;
            };
        };

        setBoard(copy);
    };

    const isLastCellFull = (position) => {
        const { isPlayerOneBall, isPlayerTwoBall } = board[0][position];

        return isPlayerOneBall || isPlayerTwoBall;
    };

    const renderInjectedComponent = () => {
        let result = null;

        if (getInjectedComponent) {
            result = getInjectedComponent({
                handleMoveDown: moveDownBall,
                handleIsLastCellFull: isLastCellFull,
                displayBoard: displayBoard
            });
        };

        return result;
    };

    const playground = () => {
        return (
            <div>
                {renderInjectedComponent()}
                <Grid>
                    {displayBoard(board, 'board')}
                </Grid>
            </div>
        );
    };

    return playground();
};

export { Board };
