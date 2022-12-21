import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { areBallObjectsEqual } from "./boardUtils";
import { A_KEYCODE, DOWN_ARROW, D_KEYCODE, LEFT_ARROW, PLAYER_ONE, PLAYER_TWO, RIGHT_ARROW, S_KEYCODE } from "./constValue";

const getBallInitialValue = (ball, colSize) => {
    const initialBallPosition = Math.ceil(colSize / 2) - 1;
    const arrayOfBallInitialValue = [];

    for (let i = 0; i < colSize; i++) {
        if (i === initialBallPosition) {
            arrayOfBallInitialValue.push(ball);
        } else {
            arrayOfBallInitialValue.push({ isPlayerOneBall: false, isPlayerTwoBall: false });
        };
    };

    return arrayOfBallInitialValue;
};

const MoveBall = React.forwardRef((props, ref) => {
    const { colSize } = props;
    const initialBallPosition = Math.ceil(colSize / 2) - 1;

    let playerOneBall = { isPlayerOneBall: true, isPlayerTwoBall: false };
    let playerTwoBall = { isPlayerOneBall: false, isPlayerTwoBall: true };

    const [ballPlayer, setBallPlayer] = useState(playerOneBall);

    const playerMovement = {
        playerOne: {
            rightMove: RIGHT_ARROW,
            leftMove: LEFT_ARROW,
            downMove: DOWN_ARROW
        },
        playerTwo: {
            rightMove: D_KEYCODE,
            leftMove: A_KEYCODE,
            downMove: S_KEYCODE
        }
    };

    const [ballController, setBallController] = useState(getBallInitialValue(playerOneBall, colSize));

    useEffect(() => {
        if ((ref || {}).current) {
            (ref || {}).current.focus();
        };
    }, []);

    useEffect(() => {
        if (props.shouldStop) {
            const copy = [...ballController];
            const currentBallPosition = getCurrentBallPosition();
            copy[currentBallPosition] = { isPlayerOneBall: false, isPlayerTwoBall: false };

            setBallController(copy);
        };
    }, [props.shouldStop]);

    useEffect(() => {
        if (props.shouldRestartGame) {
            const copy = [...ballController];
            const currentBallPosition = initialBallPosition;

            if (areBallObjectsEqual(props.winnerBall, playerOneBall)) {
                copy[currentBallPosition] = { isPlayerOneBall: false, isPlayerTwoBall: true };
            } else {
                copy[currentBallPosition] = { isPlayerOneBall: true, isPlayerTwoBall: false };
            };

            setBallController(copy);

            props.afterGameRestart(false);
        };
    }, [props.shouldRestartGame])

    const handlePressKey = (event) => {

        const currentPlayer = ballPlayer.isPlayerOneBall ? PLAYER_ONE : PLAYER_TWO;
        const currentKeys = playerMovement[currentPlayer];
        const { rightMove, leftMove, downMove } = currentKeys;

        if (!props.shouldStop) {
            switch (event.keyCode) {
                case rightMove:
                    moveRight(event);
                    break;
                case leftMove:
                    moveLeft(event);
                    break;
                case downMove:
                    moveDown(event);
                    break;
                default:
                    break;
            };
        };
    };

    const getCurrentBallPosition = () => {
        return ballController.findIndex((object) => (
            object.isPlayerOneBall || object.isPlayerTwoBall
        ));
    };

    const moveRight = () => {
        const copy = [...ballController];
        const currentBallPosition = getCurrentBallPosition();

        if (currentBallPosition !== copy.length - 1) {
            copy[currentBallPosition + 1] = { ...copy[currentBallPosition] };
            copy[currentBallPosition] = { isPlayerOneBall: false, isPlayerTwoBall: false };
        };

        setBallController(copy);
    };

    const moveLeft = () => {
        const copy = [...ballController];
        const currentBallPosition = getCurrentBallPosition();

        if (currentBallPosition !== 0) {
            copy[currentBallPosition - 1] = { ...copy[currentBallPosition] };
            copy[currentBallPosition] = { isPlayerOneBall: false, isPlayerTwoBall: false };
        };

        setBallController(copy);
    };

    const moveDown = () => {
        const position = getCurrentBallPosition();
        const activeElement = ballController[position];

        if (!props.handleIsLastCellFull(position)) {
            props.handleMoveDown(position, activeElement);

            if (ballPlayer.isPlayerOneBall) {
                setBallPlayer(playerTwoBall);
                setBallController(getBallInitialValue(playerTwoBall, colSize));
            } else {
                setBallPlayer(playerOneBall);
                setBallController(getBallInitialValue(playerOneBall, colSize));
            };
        };
    };

    return (
        <div className={'firstLine-container'} onKeyDown={(e) => { handlePressKey(e) }} tabIndex={0} ref={ref} >
            <Grid className={'firstLine-container'} item xs={12}>
                {props.displayBoard([ballController], 'move')}
            </Grid>
        </div>
    );
});

export { MoveBall };
