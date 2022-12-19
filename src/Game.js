import { Grid } from '@mui/material';
import React, { createRef, useState } from 'react';
import { Board } from './Board';
import { BoardSize } from './BoardSize';
import { DisplayPlayerScore } from './DisplayPlayerScore';
import { getWinner } from './gameLogic';
import { LoginForm } from './LoginForm';
import { MoveBall } from './MoveBall';
import { Winner } from './Winner';

const Game = () => {

    const [boardSize, setBoardSize] = useState({ row: 8, col: 8 });
    const [nInARow, setNInARow] = useState(4);

    const [playerOne, setPlayerOne] = useState({ name: 'playerOne', score: 0 });
    const [playerTwo, setPlayerTwo] = useState({ name: 'playerTwo', score: 0 });

    const [gameStarted, setGameStarted] = useState(false);
    const [restartGame, setRestartGame] = useState('');

    const [viewLoginForm, setViewLoginForm] = useState(false);
    const [viewBoard, setViewBoard] = useState(false);

    const [winner, setWinner] = useState('');
    const [winnerBall, setWinnerBall] = useState('');

    const playersProps = { playerOne, setPlayerOne, playerTwo, setPlayerTwo };

    const moveBallRef = createRef();

    const isValidUsername = (name, value) => {
        const isValidName = value.length >= 3;

        switch (name) {
            case 'playerOne':
            case 'playerTwo':
                return isValidName;
            default:
                break;
        };
    };

    const isValidNumber = (name, value) => {
        const isValid = Number(value) >= 4;
        const isValidNInARow = Number(value) >= 2;

        switch (name) {
            case 'rows':
            case 'columns':
                return isValid;
            case 'nInARows':
                return isValidNInARow;
            default:
                break;
        };
    };

    const handleName = (event) => {
        const { name, value } = event.target;

        isValidUsername(name, value);

        return (
            name === "playerOne"
                ? setPlayerOne({ ...playerOne, name: value })
                : setPlayerTwo({ ...playerTwo, name: value })
        );
    };

    const handleBoardSize = (event) => {
        const { name, value } = event.target;

        isValidNumber(name, value);

        switch (name) {
            case 'rows':
                setBoardSize({ ...boardSize, row: value });
                break;
            case 'columns':
                setBoardSize({ ...boardSize, col: value });
                break;
            case 'nInARows':
                setNInARow(value);
                break;
            default:
                break;
        };

        return name;
    };

    const handleLoginForm = () => {
        setViewLoginForm(true);
    };

    const handleStartGame = () => {
        setGameStarted(true);
        setViewBoard(true);
    };

    const renderNewRound = (newFocusRef, winner) => {
        let ballWinner = '';

        if (winner === playerOne.name) {
            ballWinner = { isPlayerOneBall: true, isPlayerTwoBall: false };
            setWinnerBall(ballWinner);
        } else if (winner === playerTwo.name) {
            ballWinner = { isPlayerOneBall: false, isPlayerTwoBall: true };
            setWinnerBall(ballWinner);
        };

        setRestartGame(true);
        checkPointsForPlayer(winner);
        setWinner('');

        newFocusRef && newFocusRef.current && newFocusRef.current.focus();
    };

    const checkPointsForPlayer = (winner) => {
        let result = '';

        if (winner === playerOne.name) {
            result = playerOne.score;
            setPlayerOne({ ...playerOne, score: playerOne.score + 1 });
        } else if (winner === playerTwo.name) {
            result = playerTwo.score;
            setPlayerTwo({ ...playerTwo, score: playerTwo.score + 1 });
        };

        return result;
    };

    const runBoardCheck = (board) => {
        const winner = getWinner(board, { playerOneName: playerOne.name, playerTwoName: playerTwo.name, nInARow: nInARow });
        winner && setWinner(winner);
    };

    const getMoveBallComponent = (props) => {
        const { displayBoard, handleMoveDown, handleIsLastCellFull } = props;

        return (
            <MoveBall
                displayBoard={displayBoard}
                handleMoveDown={handleMoveDown}
                handleIsLastCellFull={handleIsLastCellFull}
                ref={moveBallRef}
                shouldStop={winner}
                shouldRestartGame={restartGame}
                afterGameRestart={setRestartGame}
                winnerBall={winnerBall}
                rowSize={1}
                colSize={boardSize.col}
            />
        );
    };

    const renderLoginForm = () => {
        return (
            <div>
                {viewLoginForm
                    ? <LoginForm
                        setName={handleName}
                        onClick={handleStartGame}
                        isFirstInputValid={isValidUsername('playerOne', playerOne.name)}
                        isSecondInputValid={isValidUsername('playerTwo', playerTwo.name)}
                        shouldDisabledButton={playerOne.name.length < 3 || playerTwo.name.length < 3}
                    />
                    : <BoardSize
                        setSize={handleBoardSize}
                        onClick={handleLoginForm}
                        nInARow={nInARow}
                        isRowNumberValid={isValidNumber('rows', boardSize.row)}
                        isColNumberValid={isValidNumber('columns', boardSize.col)}
                        isNinARowValid={isValidNumber('nInARows', nInARow)}
                        shouldDisabledButtonBoardSize={boardSize.row < 4 || boardSize.col < 4 || nInARow < 2}
                    />
                }
            </div>
        );
    };

    const boardPage = () => {
        return (
            <Grid container>
                <Grid className={'playerOne-container'} item xs={2}>
                    <DisplayPlayerScore
                        player={playersProps.playerOne}
                        setPlayer={playersProps.setPlayerOne}
                    />
                </Grid>
                <Grid className={'board-container'} item xs={8}>
                    <Board
                        getInjectedComponent={getMoveBallComponent}
                        boardSize={boardSize}
                        nInARow={nInARow}
                        runOnUpdate={runBoardCheck}
                        shouldReset={winner}
                        restartGame={restartGame}
                        setRestartGame={setRestartGame}
                        winnerBall={winnerBall}
                    />
                </Grid>
                <Grid className={'playerTwo-container'} item xs={2}>
                    <DisplayPlayerScore
                        player={playersProps.playerTwo}
                        setPlayer={playersProps.setPlayerTwo}
                    />
                </Grid>
                <Grid className={'winner-container'} item xs={7}>
                    <Winner
                        winner={winner}
                        playersProps={playersProps}
                        nInARow={nInARow}
                        moveBallRef={moveBallRef}
                        renderNewRound={renderNewRound}
                        setViewBoard={setViewBoard}
                    />
                </Grid>
            </Grid>
        );
    };

    const renderBoard = () => {
        return (
            <div>
                {viewBoard
                    ? boardPage()
                    : <Winner
                        winner={winner}
                        playersProps={playersProps}
                        nInARow={nInARow}
                        moveBallRef={moveBallRef}
                        renderNewRound={renderNewRound}
                        setViewBoard={setViewBoard}
                    />
                }
            </div >
        );
    };

    return (
        <div>
            <h1>{nInARow} in a row</h1>
            {gameStarted
                ? renderBoard()
                : renderLoginForm()
            }
        </div>
    );
};

export { Game };