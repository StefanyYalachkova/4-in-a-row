import React, { useState } from "react";
import { Button, Grid } from '@mui/material';
import { MoveBall } from "./MoveBall";
import { SVGBallPlayer1 } from "./SVGBallPlayer1";
import { SVGBallPlayer2 } from "./SVGBallPlayer2";
import { getWinner } from "./GameLogic";
import { getIsBallObjectEmpty } from "./utils";

const Board = (props) => {

    const initialValue = () => {
        const matrixOfObjects = [];

        for (let i = 0; i < 8; i++) {
            matrixOfObjects[i] = [];
            for (let j = 0; j < 8; j++) {
                matrixOfObjects[i][j] = ({ isPlayerOneBall: false, isPlayerTwoBall: false });
            };
        };

        return matrixOfObjects;
    };

    const [board, setBoard] = useState(initialValue());

    const [restartGame, setRestartGame] = useState('');

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
            <Grid className={'row-container'} xs={12} key={key}>
                {getColumns(keyPrefix, rowIndex)}
            </Grid>
        );

        for (let row = 0; row < rowCount; row++) {
            result.push(getRowElement(`${keyPrefix}-${row}`, row));
        };

        return result;
    }

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

    const getWinnerMessage = () => {
        const winnerForNow = getWinner(board, props.playerOne.name, props.playerTwo.name);
        
        if (winnerForNow) {
            return (
                <div>
                    <b>{winnerForNow} wins!</b>
                    <Button variant="contained" type="submit" onClick={renderNewRound}>New Round</Button>
                </div>
            );
        };
    };

    const renderNewRound = () => {
        setRestartGame(true);
        checkPointsForPlayer();
        setBoard(initialValue());
       
    };

    const checkPointsForPlayer = () => {
        let winner = getWinner(board, props.playerOne.name, props.playerTwo.name);
        let result = '';

        if (winner === props.playerOne.name) {
            result = props.playerOne.score;
            props.setPlayerOne({ ...props.playerOne, score: props.playerOne.score + 1 });
        } else if (winner === props.playerTwo.name) {
            result = props.playerTwo.score;
            props.setPlayerTwo({ ...props.playerTwo, score: props.playerTwo.score + 1 })
        };

        return result;
    };

    const playground = () => {
        return (
            <Grid container>
                <Grid className={'player-container'} item xs={2}>
                    <h2>{props.playerOne.name}: {props.playerOne.score}</h2>
                </Grid>
                <Grid className={'board-container'} item xs={8}>
                    <MoveBall
                        displayBoard={displayBoard}
                        handleMoveDown={moveDownBall}
                        handleIsLastCellFull={isLastCellFull}
                        shouldStop={getWinner(board, props.playerOne.name, props.playerTwo.name)}
                        shouldRestartGame={restartGame}
                        afterGameRestart={setRestartGame}
                    />
                    <Grid>
                        {displayBoard(board, 'board')}
                    </Grid>
                </Grid>
                <Grid className={'player-container'} item xs={2}>
                    <h2>{props.playerTwo.name}: {props.playerTwo.score}</h2>
                </Grid>
                <Grid className={'winner-container'} item xs={8}>
                    {getWinnerMessage()}
                    {(props.playerOne.score === 3 || props.playerTwo.score === 3)
                        && <h2>Game over! {props.playerOne.score ? `${props.playerOne.name} wins!` : `${props.playerTwo.name} wins!`} </h2>
                    }
                </Grid>

            </Grid>
        );
    };

    return playground();
};

export { Board };