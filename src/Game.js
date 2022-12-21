import { Grid } from '@mui/material';
import React, { createRef, useState } from 'react';
import { Board } from './Board';
import { BoardSizeForm } from './BoardSizeForm';
import { PlayerScore } from './PlayerScore';
import { getWinnerForThisRound } from './boardRenderUtils';
import { LoginForm } from './LoginForm';
import { MoveBall } from './MoveBall';
import { isValidNumber, isValidUsername } from './gameUtils';
import { EndGameInfo } from './EndGameInfo';
import { INITIAL_COL_NUMBER, INITIAL_ROW_NUMBER, INITIAL_WINCOUNT_NUMBER, PLAYER_ONE, PLAYER_TWO } from './constValue';

const Game = () => {
    const [boardSize, setBoardSize] = useState({ row: INITIAL_ROW_NUMBER, col: INITIAL_COL_NUMBER });
    const [winCount, setWinCount] = useState(INITIAL_WINCOUNT_NUMBER);

    const [playerOne, setPlayerOne] = useState({ name: PLAYER_ONE, score: 0 });
    const [playerTwo, setPlayerTwo] = useState({ name: PLAYER_TWO, score: 0 });

    const [gameStarted, setGameStarted] = useState(false);
    const [restartGame, setRestartGame] = useState(false);

    const [viewLoginForm, setViewLoginForm] = useState(false);
    const [viewBoard, setViewBoard] = useState(false);

    const [winner, setWinner] = useState('');
    const [winnerBall, setWinnerBall] = useState('');

    const playersProps = { playerOne, setPlayerOne, playerTwo, setPlayerTwo };

    const moveBallRef = createRef();

    const onFormLogin = (event) => {
        const { name, value } = event.target;

        return (
            name === PLAYER_ONE
                ? setPlayerOne({ ...playerOne, name: value })
                : setPlayerTwo({ ...playerTwo, name: value })
        );
    };

    const onGameStart = (event) => {
        const { name, value } = event.target;

        isValidNumber(name, value);

        switch (name) {
            case 'rows':
                setBoardSize({ ...boardSize, row: value });
                break;
            case 'columns':
                setBoardSize({ ...boardSize, col: value });
                break;
            case 'winCount':
                setWinCount(value);
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
        const winner = getWinnerForThisRound(board, { playerOneName: playerOne.name, playerTwoName: playerTwo.name, winCount: winCount });

        if (winner !== {}) {
            winner && setWinner(winner);
        };
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
                        setName={onFormLogin}
                        onClick={handleStartGame}
                        isFirstInputValid={isValidUsername(PLAYER_ONE, playerOne.name)}
                        isSecondInputValid={isValidUsername(PLAYER_TWO, playerTwo.name)}
                        playersProps={playersProps}
                    />
                    : <BoardSizeForm
                        setSize={onGameStart}
                        onClick={handleLoginForm}
                        winCount={winCount}
                        rowSize={boardSize.row}
                        colSize={boardSize.col}
                        isRowNumberValid={isValidNumber('rows', boardSize.row)}
                        isColNumberValid={isValidNumber('columns', boardSize.col)}
                        isWinCountValid={isValidNumber('winCount', winCount)}
                    />
                }
            </div>
        );
    };

    const boardPage = () => {
        return (
            <Grid container>
                <Grid className={'playerOne-container'} item xs={2}>
                    <PlayerScore
                        player={playersProps.playerOne}
                        setPlayer={playersProps.setPlayerOne}
                    />
                </Grid>
                <Grid className={'board-container'} item xs={8}>
                    <Board
                        getInjectedComponent={getMoveBallComponent}
                        boardSize={boardSize}
                        runOnUpdate={runBoardCheck}
                        shouldReset={winner}
                        restartGame={restartGame}
                        setRestartGame={setRestartGame}
                        winnerBall={winnerBall}
                    />
                </Grid>
                <Grid className={'playerTwo-container'} item xs={2}>
                    <PlayerScore
                        player={playersProps.playerTwo}
                        setPlayer={playersProps.setPlayerTwo}
                    />
                </Grid>
                <Grid className={'winner-container'} item xs={7}>
                    <EndGameInfo
                        winner={winner}
                        playersProps={playersProps}
                        winCount={winCount}
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
                    : <EndGameInfo
                        winner={winner}
                        playersProps={playersProps}
                        winCount={winCount}
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
            <h1>{winCount} in a row</h1>
            {gameStarted
                ? renderBoard()
                : renderLoginForm()
            }
        </div>
    );
};

export { Game };
