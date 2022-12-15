import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { DisplayPlayerScore } from "./DisplayPlayerScore";

const Winner = (props) => {
    const { playerOne, playerTwo } = props.playersProps;

    useEffect(() => {
        if (playerOne.score === 3 || playerTwo.score === 3) {
            props.setViewBoard(false)
        }
    }, [props.renderNewRound]);

    const getWinnerMessage = (newFocusRef) => {
        if (props.winner) {
            return (
                <div>
                    <b>{props.winner} wins!</b>
                    <Button variant="contained" type="submit" onClick={() => props.renderNewRound(newFocusRef, props.winner)}>New Round</Button>
                </div>
            );
        };
    };

    const gameOver = () => {
        let displayResult = '';

        if (playerOne.score === 3 || playerTwo.score === 3) {
            displayResult = (
                <Grid container >
                    <Grid className={'player-container'} item xs={7}>
                        <DisplayPlayerScore
                            player={props.playersProps.playerOne}
                            setPlayer={props.playersProps.setPlayerOne}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid className={'player-container'} >
                        <DisplayPlayerScore
                            player={props.playersProps.playerTwo}
                            setPlayer={props.playersProps.setPlayerTwo}
                        />
                    </Grid>
                </Grid>
            );
        } else {
            displayResult = getWinnerMessage(props.moveBallRef);
        };

        return displayResult;
    };

    return (
        <div>
            {gameOver()}
        </div>
    );
};

export { Winner };