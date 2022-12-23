import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import renderer from 'react-test-renderer';
import { EndGameInfo } from "../src/EndGameInfo";

describe('EndGameInfo test', () => {
    it('renders correctly', () => {
        const playerOne = { name: 'Stef', score: 0 };
        const playerTwo = { name: 'Angel', score: 0 };
        const setPlayerOne = jest.fn();
        const setPlayerTwo = jest.fn();
        const moveBallRef = jest.fn();
        const winner = playerOne.name;
        const setViewBoard = jest.fn();
        const renderNewRound = jest.fn();

        const tree = renderer
            .create(<EndGameInfo
                playersProps={{ playerOne, playerTwo, setPlayerOne, setPlayerTwo }}
                moveBallRef={moveBallRef}
                winner={winner}
                setViewBoard={setViewBoard}
                renderNewRound={renderNewRound}
            />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders correctly gameOverInfo', () => {
        const playerOne = { name: 'Stef', score: 3 };
        const playerTwo = { name: 'Angel', score: 0 };
        const setPlayerOne = jest.fn();
        const setPlayerTwo = jest.fn();
        const moveBallRef = jest.fn();
        const winner = playerOne.name;
        const setViewBoard = jest.fn();
        const renderNewRound = jest.fn();

        const tree = renderer
            .create(<EndGameInfo
                playersProps={{ playerOne, playerTwo, setPlayerOne, setPlayerTwo }}
                moveBallRef={moveBallRef}
                winner={winner}
                setViewBoard={setViewBoard}
                renderNewRound={renderNewRound}
            />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('handles New Round button correctly', () => {

        const playerOne = { name: 'Stef', score: 1 };
        const playerTwo = { name: 'Angel', score: 0 };
        const setPlayerOne = jest.fn();
        const setPlayerTwo = jest.fn();
        const moveBallRef = jest.fn();
        const winner = playerOne.name;
        const setViewBoard = jest.fn();
        const renderNewRound = jest.fn();
        const newFocusRef = jest.fn();

        render(<EndGameInfo
            playersProps={{ playerOne, playerTwo, setPlayerOne, setPlayerTwo }}
            moveBallRef={moveBallRef}
            winner={winner}
            setViewBoard={setViewBoard}
            renderNewRound={renderNewRound}
            onClick={() => renderNewRound(newFocusRef, winner)}
        />)
        fireEvent.click(screen.getByText('New Round'))
        expect(renderNewRound).toBeCalled();
    });
});
