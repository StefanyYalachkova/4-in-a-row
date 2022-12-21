import { Grid } from "@mui/material";
import { SVGBallPlayer1 } from "./SVGBallPlayer1";
import { SVGBallPlayer2 } from "./SVGBallPlayer2";

const getIsBallObjectEmpty = (ballObject) => {
    return !(ballObject.isPlayerOneBall || ballObject.isPlayerTwoBall);
};

const areBallObjectsEqual = (ballObject1, ballObject2) => {
    return ballObject1.isPlayerOneBall === ballObject2.isPlayerOneBall
        && ballObject1.isPlayerTwoBall === ballObject2.isPlayerTwoBall;
};

const getBoardInitialState = (rowSize, colSize) => {
    const matrixOfObjects = [];

    for (let i = 0; i < rowSize; i++) {
        matrixOfObjects[i] = [];
        for (let j = 0; j < colSize; j++) {
            matrixOfObjects[i][j] = ({ isPlayerOneBall: false, isPlayerTwoBall: false });
        };
    };

    return matrixOfObjects;
};

const displayBoard = (boardState, keyPrefix) => {
    let result = [];
    const rowCount = boardState.length;
    const colCount = boardState[0].length;

    let getColElement = (keyPrefix, rowIndex, col) => {
        return (
            <Grid className={'cow-container'} item xs={1} key={`${keyPrefix}-${rowIndex}-${col}`}>
                <svg viewBox="0 0 24 24">
                    <rect width="30" height="30" style={{ fill: "rgb(0,0,255)", strokeWidth: 0, stroke: "rgb(0,0,0)" }} />
                    <DisplayBall element={boardState[rowIndex][col]} />
                </svg>
            </Grid>
        );
    };

    const getColumns = (keyPrefix, rowIndex) => {
        const columns = [];

        for (let col = 0; col < colCount; col++) {
            columns.push(getColElement(keyPrefix, rowIndex, col));
        };

        return columns;
    };

    const getRowElement = (key, rowIndex) => (
        <Grid className={'row-container'} xs={9} key={key}>
            {getColumns(keyPrefix, rowIndex)}
        </Grid>
    );

    for (let row = 0; row < rowCount; row++) {
        result.push(getRowElement(`${keyPrefix}-${row}`, row));
    };

    return result;
};

const DisplayBall = (props) => {
    const { element } = props;

    let result = (
        <svg>
            <circle
                cx="12" cy="12" r="8"
                strokeWidth="6" stroke="white"
                fill="white"
            />
        </svg>
    );

    if (element.isPlayerOneBall || element.isPlayerTwoBall) {
        result = (
            element.isPlayerOneBall
                ? <SVGBallPlayer1 />
                : <SVGBallPlayer2 />
        );
    };

    return result;
};

export { getIsBallObjectEmpty, areBallObjectsEqual, getBoardInitialState, displayBoard, DisplayBall };
