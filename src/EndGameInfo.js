import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { MAX_SCORE } from "./constValue";
import { PlayerScore } from "./PlayerScore";

const EndGameInfo = (props) => {
    const { moveBallRef, winner, setViewBoard, renderNewRound } = props;
    const { playerOne, playerTwo, setPlayerOne, setPlayerTwo } = props.playersProps;

    useEffect(() => {
        if (playerOne.score === MAX_SCORE || playerTwo.score === MAX_SCORE) {
            setViewBoard(false)
        }
    }, [renderNewRound]);

    const getWinnerMessage = (newFocusRef) => {
        let result = null;

        if (winner) {
            result = (
                <div>
                    <b>{winner} wins!</b>
                    <Button variant="contained" type="submit" onClick={() => renderNewRound(newFocusRef, winner)}> New Round </Button>
                </div>
            );
        };

        return result;
    };

    const gameOverInfo = () => {
        let displayResult = '';

        if (playerOne.score === MAX_SCORE || playerTwo.score === MAX_SCORE) {
            displayResult = (
                <Grid container >
                    <Grid className={'player-container'} item xs={7}>
                        <PlayerScore
                            player={playerOne}
                            setPlayer={setPlayerOne}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid className={'player-container'} >
                        <PlayerScore
                            player={playerTwo}
                            setPlayer={setPlayerTwo}
                        />
                    </Grid>
                </Grid>
            );
        } else {
            displayResult = getWinnerMessage(moveBallRef);
        };

        return displayResult;
    };

    return (
        <div>
            {gameOverInfo()}
        </div>
    );
};

export { EndGameInfo };
