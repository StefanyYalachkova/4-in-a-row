import React from "react";
import { Button, TextField } from '@mui/material';

const StartingScreen = (props) => {

    const handleConfirm = (event) => {
        event.preventDefault();
        props.onClick();
    };

    return (
        <div>
            <form>
                <h1>Players :</h1>
                <span id="playerField">Player 1:</span>
                <TextField
                    type="text"
                    name="playerOne"
                    onChange={props.setName}
                    helperText={props.isFirstInputValid ? '' : <span id="errorMessage">Need atleast 3 letters</span>}
                />
                <span id="playerField">Player 2:</span>
                <TextField
                    type="text"
                    name="playerTwo"
                    onChange={props.setName}
                    helperText={props.isSecondInputValid ? '' : <span id="errorMessage">Need atleast 3 letters</span>}
                />
                <Button disabled={props.shouldDisabledButton} variant="contained" type="submit" onClick={handleConfirm}> Confirm </Button>
            </form>
        </div>
    );
};

export { StartingScreen };