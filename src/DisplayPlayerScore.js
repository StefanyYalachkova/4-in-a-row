import React from "react";

const DisplayPlayerScore = (props) => {

    return (
        <div>
            <h2>{props.player.name}: {props.player.score}</h2>
        </div>
    );
};

export { DisplayPlayerScore };