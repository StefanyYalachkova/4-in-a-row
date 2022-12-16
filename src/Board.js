import React, { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { MoveBall } from "./MoveBall";
import { SVGBallPlayer1 } from "./SVGBallPlayer1";
import { SVGBallPlayer2 } from "./SVGBallPlayer2";
import { getIsBallObjectEmpty } from "./utils";

const Board = (props) => {

    let rowSize = props.boardSize.row;
    let colSize = props.boardSize.col;

    const initialValue = () => {
        const matrixOfObjects = [];

        for (let i = 0; i < rowSize; i++) {
            matrixOfObjects[i] = [];
            for (let j = 0; j < colSize; j++) {
                matrixOfObjects[i][j] = ({ isPlayerOneBall: false, isPlayerTwoBall: false });
            };
        };

        return matrixOfObjects;
    };

    const [board, setBoard] = useState(initialValue());

    useEffect(() => {
        if (props.restartGame) {
            setBoard(initialValue());
        } else {
            props.runOnUpdate(board);
        };
    }, [board, props.restartGame]);

    const displayBoard = (boardState, keyPrefix) => {
        let result = [];
        const rowCount = boardState.length;
        const colCount = boardState[0].length;

        let getColElement = (keyPrefix, rowIndex, col) => {
            return (
                <Grid className={'cow-container'} item xs={1} key={`${keyPrefix}-${rowIndex}-${col}`}>
                    <svg
                        viewBox="0 0 24 24"
                    >
                        <rect width="30" height="30" style={{ fill: "rgb(0,0,255)", strokeWidth: 0, stroke: "rgb(0,0,0)" }} />
                        {displayBall(boardState[rowIndex][col])}
                    </svg>
                </Grid>
            );
        };

        const getColumns = (keyPrefix, rowIndex) => {
            const columns = [];
            for (let col = 0; col < colCount; col++) {
                columns.push(getColElement(keyPrefix, rowIndex, col));
            };

            return columns;
        };

        let getRowElement = (key, rowIndex) => (
            <Grid className={'row-container'} xs={9} key={key}>
                {getColumns(keyPrefix, rowIndex)}
            </Grid>
        );

        for (let row = 0; row < rowCount; row++) {
            result.push(getRowElement(`${keyPrefix}-${row}`, row));
        };

        return result;
    };

    const displayBall = (element) => {
        if (element.isPlayerOneBall || element.isPlayerTwoBall) {

            return (
                element.isPlayerOneBall === true
                    ? <SVGBallPlayer1 />
                    : <SVGBallPlayer2 />
            );
        } else {

            return (
                <svg>
                    <circle
                        cx="12" cy="12" r="8"
                        strokeWidth="6" stroke="white"
                        fill="white"
                    />
                </svg >
            );
        };
    };

    const moveDownBall = (position, activeElement) => {
        const copy = [...board];
        let isTurnFinished = false;

        let startLine = copy.length - 1;
        let valueToSet = { isPlayerOneBall: false, isPlayerTwoBall: false };

        while (startLine >= 0 && !isTurnFinished) {
            if (getIsBallObjectEmpty(copy[startLine][position])) {
                if (activeElement.isPlayerOneBall === true) {
                    valueToSet = { isPlayerOneBall: true, isPlayerTwoBall: false };
                    copy[startLine][position] = valueToSet;
                } else {
                    valueToSet = { isPlayerOneBall: false, isPlayerTwoBall: true };
                    copy[startLine][position] = valueToSet;
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

    const playground = () => {

        return (
            <div>
                <MoveBall
                    displayBoard={displayBoard}
                    handleMoveDown={moveDownBall}
                    handleIsLastCellFull={isLastCellFull}

                    shouldStop={props.shouldReset}
                    shouldRestartGame={props.restartGame}
                    afterGameRestart={props.setRestartGame}
                    winnerBall={props.winnerBall}
                    rowSize={rowSize}
                    colSize={colSize}
                    ref={props.moveBallReff}
                />
                <Grid>
                    {displayBoard(board, 'board')}
                </Grid>
            </div>
        );
    };

    return playground();
};

export { Board };