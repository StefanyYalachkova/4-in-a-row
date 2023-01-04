import React from "react";

const PlayerScore = (props) => {
    const { name, score } = props.player;
    return (
        <div>
            <h2>{name}: {score}</h2>
        </div>
    );
};

export { PlayerScore };
