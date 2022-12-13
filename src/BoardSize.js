import React from "react";
import { Button, TextField } from '@mui/material';

const BoardSize = (props) => {

    const handleConfirm = (event) => {
        event.preventDefault();
        props.onClick();
    };

    return (
        <div>
            <form>
                <h1>Set board size :</h1>
                <span id="rowsField">Rows:</span>
                <TextField
                    type="number"
                    name="rows"
                    onChange={props.setSize}
                    helperText={props.isRowNumberValid ? '' : <span id="errorMessage">Enter a number greater than 4.</span>}
                />
                <span id="colsField">Columns:</span>
                <TextField
                    type="number"
                    name="columns"
                    onChange={props.setSize}
                    helperText={props.isColNumberValid ? '' : <span id="errorMessage">Enter a number greater than 4.</span>}
                />
                <span id="nInARowField">N in a row:</span>
                <TextField
                    type="number"
                    name="nInARows"
                    onChange={props.setSize}
                    helperText={props.isNinARowValid ? '' : <span id="errorMessage">Enter a number greater than 2.</span>}
                />
                <Button disabled={props.shouldDisabledButtonBoardSize} variant="contained" type="submit" onClick={handleConfirm}> Confirm </Button>
            </form>
        </div>
    );
};

export { BoardSize };