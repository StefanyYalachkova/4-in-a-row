import React, { useState } from 'react';
import { Board } from './Board';
import { StartingScreen } from './StartingScreen';

const Game = () => {
    const [gameStarted, setGameStarted] = useState(false);
    //const [boardSize, setBoardSize] = useState(8);

    const [playerOne, setPlayerOne] = useState({ name: '', score: 0 });
    const [playerTwo, setPlayerTwo] = useState({ name: '', score: 0 });

    const [isFirstInputValid, setIsFirstInputValid] = useState(true);
    const [isSecondInputValid, setIsSecondInputValid] = useState(true);

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

    const handleName = (event) => {
        const { name, value } = event.target;

        isValidUsername(name, value);

        return (
            name === "playerOne"
                ? setPlayerOne({ ...playerOne, name: value })
                : setPlayerTwo({ ...playerTwo, name: value })
        );
    };

    const handleStart = () => {
        //setBoardSize(inpVal);
        setGameStarted(true);
    };

    return (
        <div>
            <h1>4 in a row</h1>
            {gameStarted
                ? <Board
                    playerOne={playerOne}
                    setPlayerOne={setPlayerOne}

                    playerTwo={playerTwo}
                    setPlayerTwo={setPlayerTwo}
                />
                : <StartingScreen
                    setName={handleName}
                    onClick={handleStart}
                    isFirstInputValid={isFirstInputValid}
                    isSecondInputValid={isSecondInputValid}
                    shouldDisabledButton={playerOne.name.length < 3 || playerTwo.name.length < 3}
                />
            }
        </div>
    );
};

export { Game };