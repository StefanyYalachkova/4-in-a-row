import { fireEvent, render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { LoginForm, PlayerField } from '../src/LoginForm';

describe('Login Form test', () => {
    it('renders correctly', () => {
        const playerOne = { name: 'Stef', score: 0 };
        const playerTwo = { name: 'Angel', score: 0 };
        const tree = renderer
            .create(<LoginForm playersProps={{ playerOne, playerTwo }} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('handles confirm correctly', () => {
        const playerOne = { name: 'Stef', score: 0 };
        const playerTwo = { name: 'Angel', score: 0 };
        const testFunc = jest.fn();
        // const handleClick = jest.spyOn(React, "useState");
        // handleClick.mockImplementation(size => [size, changeSize]);

        render(<LoginForm playersProps={{ playerOne, playerTwo }} onClick={testFunc} />)
        fireEvent.click(screen.getByText('Confirm'))
        expect(testFunc).toBeCalled();
    });
    it('checking disabled button', () => {
        const playerOne = { name: 'St', score: 0 };
        const playerTwo = { name: 'An', score: 0 };
        const testFunc = jest.fn();

        render(<LoginForm playersProps={{ playerOne, playerTwo }} onClick={testFunc} />)
        fireEvent.click(screen.getByText('Confirm'))
        expect(testFunc).not.toBeCalled();
    });
});

describe('PlayerField', () => {
    it('renders correctly', () => {
        const setName = jest.fn();
        const isInputValid = true;
        const name = 'Stef';
        const player = 'playerOne';
        const result = { setName, isInputValid, name, player };

        const tree = renderer
            .create(<PlayerField {...result} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

