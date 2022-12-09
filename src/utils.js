const getIsBallObjectEmpty = (ballObject) => {
    return !(ballObject.isPlayerOneBall || ballObject.isPlayerTwoBall);
};

const areBallObjectsEqual = (ballObject1, ballObject2) => {
    return ballObject1.isPlayerOneBall === ballObject2.isPlayerOneBall
        && ballObject1.isPlayerTwoBall === ballObject2.isPlayerTwoBall;
};

export { getIsBallObjectEmpty, areBallObjectsEqual };