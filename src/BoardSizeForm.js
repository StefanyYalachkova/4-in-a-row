import React from "react";
import { Button, TextField } from '@mui/material';
import { MIN_VALID_ROW_COL_NUMBER, MIN_VALID_WINCOUNT_NUMBER } from "./constValue";

const BoardSizeForm = (props) => {
    const { setSize, isRowNumberValid, isColNumberValid, isWinCountValid, winCount, rowSize, colSize } = props;
    const shouldDisableBoardSizeButton = rowSize < MIN_VALID_ROW_COL_NUMBER || colSize < MIN_VALID_ROW_COL_NUMBER || winCount < MIN_VALID_WINCOUNT_NUMBER;

    const handleConfirm = (event) => {
        event.preventDefault();
        props.onClick();
    };

    return (
        <form>
            <h1>Set board size :</h1>
            <span id="rowsField">Rows:</span>
            <TextField
                type="number"
                name="rows"
                onChange={setSize}
                helperText={isRowNumberValid ? '' : <span className="errorMessage">Enter a number greater than 4.</span>}
            />
            <span id="colsField">Columns:</span>
            <TextField
                type="number"
                name="columns"
                onChange={setSize}
                helperText={isColNumberValid ? '' : <span className="errorMessage">Enter a number greater than 4.</span>}
            />
            <span id="winCountField">N in a row:</span>
            <TextField
                type="number"
                name="winCount"
                onChange={setSize}
                helperText={isWinCountValid ? '' : <span className="errorMessage">Enter a number greater than 2.</span>}
            />
            <Button disabled={shouldDisableBoardSizeButton} variant="contained" type="submit" onClick={handleConfirm}> Confirm </Button>
        </form>
    );
};

export { BoardSizeForm };
