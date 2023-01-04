import React from "react";
import { Button, TextField } from '@mui/material';
import { MIN_VALID_NAME_LENGTH } from "./constValue";

const PlayerField = (props) => {
    const { setName, isInputValid, name, player } = props;

    return (
        <>
            <span id="playerField">{player} :</span>
            <TextField
                type="text"
                player={player}
                name={name}
                onChange={setName}
                helperText={isInputValid ? '' : <span className="errorMessage">Need atleast 3 letters.</span>}
            />
        </>
    );
};

const LoginForm = (props) => {
    const { playerOne, playerTwo } = props.playersProps;
    const shouldDisabledButton = playerOne.name.length < MIN_VALID_NAME_LENGTH || playerTwo.name.length < MIN_VALID_NAME_LENGTH;

    const handleConfirm = (event) => {
        event.preventDefault();
        props.onClick();
    };

    return (
        <div>
            <form>
                <h1>Players :</h1>
                <PlayerField
                    isInputValid={props.isFirstInputValid}
                    setName={props.setName}
                    name="playerOne"
                    player={'Player 1'}
                />
                <PlayerField
                    isInputValid={props.isSecondInputValid}
                    setName={props.setName}
                    name="playerTwo"
                    player={'Player 2'}
                />
                <Button disabled={shouldDisabledButton} variant="contained" type="submit" onClick={handleConfirm}> Confirm </Button>
            </form>
        </div>
    );
};

export { LoginForm, PlayerField };
