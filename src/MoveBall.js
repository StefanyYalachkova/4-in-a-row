import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { areBallObjectsEqual } from "./utils"

const MoveBall = React.forwardRef((props, ref) => {

    const RIGHT_ARROW = 39;
    const LEFT_ARROW = 37;
    const DOWN_ARROW = 40;
    const A_KEYCODE = 65;
    const S_KEYCODE = 83;
    const D_KEYCODE = 68;

    const INITIAL_VALUE = Math.ceil(props.colSize / 2) - 1;

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

    useEffect(() => {
        if ((ref || {}).current) {
            (ref || {}).current.focus();
        };
    }, []);

    useEffect(() => {
        if (props.shouldStop) {
            const copy = [...array];
            const currentBallPosition = getCurrentBallPosition();
            copy[currentBallPosition] = { isPlayerOneBall: false, isPlayerTwoBall: false };

            setArray(copy);
        };

        if (props.shouldRestartGame) {
            const copy = [...array];
            const currentBallPosition = INITIAL_VALUE;

            if (areBallObjectsEqual(props.winnerBall, playerOneBall)) {
                copy[currentBallPosition] = { isPlayerOneBall: false, isPlayerTwoBall: true };
            } else {
                copy[currentBallPosition] = { isPlayerOneBall: true, isPlayerTwoBall: false };
            };

            setArray(copy);

            props.afterGameRestart(false);
        };
    }, [props.shouldStop, props.shouldRestartGame]);

    const getInitialValue = (ball) => {
        const arrayOfObjects = [];

        for (let i = 0; i < props.colSize; i++) {
            if (i === INITIAL_VALUE) {
                arrayOfObjects.push(ball);
            } else {
                arrayOfObjects.push({ isPlayerOneBall: false, isPlayerTwoBall: false });
            };
        };

        return arrayOfObjects;
    };

    const [array, setArray] = useState(getInitialValue(playerOneBall));

    const handlePressKey = (event) => {

        const currentPlayer = ballPlayer.isPlayerOneBall ? 'playerOne' : 'playerTwo';
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
        return array.findIndex((object) => (
            object.isPlayerOneBall || object.isPlayerTwoBall
        ));
    };

    const moveRight = () => {
        const copy = [...array];
        const currentBallPosition = getCurrentBallPosition();

        if (currentBallPosition !== copy.length - 1) {
            copy[currentBallPosition + 1] = { ...copy[currentBallPosition] };
            copy[currentBallPosition] = { isPlayerOneBall: false, isPlayerTwoBall: false };
        };

        setArray(copy);
    };

    const moveLeft = () => {
        const copy = [...array];
        const currentBallPosition = getCurrentBallPosition();

        if (currentBallPosition !== 0) {
            copy[currentBallPosition - 1] = { ...copy[currentBallPosition] };
            copy[currentBallPosition] = { isPlayerOneBall: false, isPlayerTwoBall: false };
        };

        setArray(copy);
    };

    const moveDown = () => {

        const position = getCurrentBallPosition();
        const activeElement = array[position];

        if (!props.handleIsLastCellFull(position)) {
            props.handleMoveDown(position, activeElement);

            if (ballPlayer.isPlayerOneBall) {
                setBallPlayer(playerTwoBall);
                setArray(getInitialValue(playerTwoBall));
            } else {
                setBallPlayer(playerOneBall);
                setArray(getInitialValue(playerOneBall));
            };
        };
    };

    return (
        <span className={'firstLine-container'} onKeyDown={(e) => { handlePressKey(e) }} tabIndex={0} ref={ref} >
            <Grid className={'firstLine-container'} item xs={12}>
                {props.displayBoard([array], 'move')}
            </Grid>
        </span>
    );
});

export { MoveBall };