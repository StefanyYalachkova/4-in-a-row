import React, { useState } from 'react';
import { Board } from './Board';
import { BoardSize } from './BoardSize';
import { LoginForm } from './LoginForm';

const Game = () => {

    const [boardSize, setBoardSize] = useState({ row: 8, col: 8 });
    const [nInARow, setNInARow] = useState({ number: 4 });

    const [playerOne, setPlayerOne] = useState({ name: '', score: 0 });
    const [playerTwo, setPlayerTwo] = useState({ name: '', score: 0 });

    const [isFirstInputValid, setIsFirstInputValid] = useState(true);
    const [isSecondInputValid, setIsSecondInputValid] = useState(true);

    const [isRowNumberValid, setIsRowNumberValid] = useState(true);
    const [isColNumberValid, setIsColNumberValid] = useState(true);

    const [isNinARowValid, setIsNinARowValid] = useState(true);

    const [gameStarted, setGameStarted] = useState(false);

    const [viewLoginForm, setViewLoginForm] = useState(false);

    const isValidUsername = (name, value) => {
        const isInvalidName = value.length < 3;

        switch (name) {
            case 'playerOne':
                setIsFirstInputValid(!isInvalidName);
                break;
            case 'playerTwo':
                setIsSecondInputValid(!isInvalidName);
                break;
            default:
                break;
        };
    };

    const isValidNumber = (name, value) => {
        const isInvalidNumber = Number(value) < 4;
        const isInvalidNInARowNumber = Number(value) < 2;
        switch (name) {
            case 'rows':
                setIsRowNumberValid(!isInvalidNumber);
                break;
            case 'columns':
                setIsColNumberValid(!isInvalidNumber);
                break;
            case 'nInARows':
                setIsNinARowValid(!isInvalidNInARowNumber);
                break;
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
                setBoardSize({ ...boardSize, col: value })
                break;
            case 'nInARows':
                setNInARow({ number: value })
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
    };

    const renderLoginForm = () => {
        return (
            <div>
                {viewLoginForm
                    ? <LoginForm
                        setName={handleName}
                        onClick={handleStartGame}
                        isFirstInputValid={isFirstInputValid}
                        isSecondInputValid={isSecondInputValid}
                        shouldDisabledButton={playerOne.name.length < 3 || playerTwo.name.length < 3}
                    />
                    : <BoardSize
                        setSize={handleBoardSize}
                        onClick={handleLoginForm}
                        nInARow={nInARow}
                        isRowNumberValid={isRowNumberValid}
                        isColNumberValid={isColNumberValid}
                        isNinARowValid={isNinARowValid}
                        shouldDisabledButtonBoardSize={boardSize.row < 4 || boardSize.col < 4 || nInARow.number < 2}
                    />
                }
            </div>
        );
    };

    return (
        <div>
            <h1>{nInARow.number} in a row</h1>
            {gameStarted
                ? <Board
                    playerOne={playerOne}
                    setPlayerOne={setPlayerOne}
                    playerTwo={playerTwo}
                    setPlayerTwo={setPlayerTwo}
                    boardSize={boardSize}
                    setBoardSize={setBoardSize}
                    nInARow={nInARow.number}
                />
                : renderLoginForm()
            }
        </div>
    );
};

export { Game };