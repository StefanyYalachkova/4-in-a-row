import { fireEvent, render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { BoardSizeForm } from "../src/BoardSizeForm";

describe('BoardSizeForm test', () => {
    it('renders correctly', () => {
        const setSize = jest.fn();
        const isRowNumberValid = true;
        const isColNumberValid = true;
        const isWinCountValid = true;
        const winCount = 4;
        const rowSize = 8;
        const colSize = 8;

        const tree = renderer
            .create(<BoardSizeForm
                setSize={setSize}
                isRowNumberValid={isRowNumberValid}
                isColNumberValid={isColNumberValid}
                isWinCountValid={isWinCountValid}
                winCount={winCount}
                rowSize={rowSize}
                colSize={colSize}
            />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('handles confirm correctly', () => {
        const setSize = jest.fn();
        const isRowNumberValid = true;
        const isColNumberValid = true;
        const isWinCountValid = true;
        const winCount = 4;
        const rowSize = 8;
        const colSize = 8;
        const testFunc = jest.fn();

        render(<BoardSizeForm
            setSize={setSize}
            isRowNumberValid={isRowNumberValid}
            isColNumberValid={isColNumberValid}
            isWinCountValid={isWinCountValid}
            winCount={winCount}
            rowSize={rowSize}
            colSize={colSize}
            onClick={testFunc}
        />)
        fireEvent.click(screen.getByText('Confirm'))
        expect(testFunc).toBeCalled();
    });
    it('checking disabled button', () => {
        const setSize = jest.fn();
        const isRowNumberValid = true;
        const isColNumberValid = true;
        const isWinCountValid = true;
        const winCount = 0;
        const rowSize = 0;
        const colSize = 0;
        const testFunc = jest.fn();

        render(<BoardSizeForm
            setSize={setSize}
            isRowNumberValid={isRowNumberValid}
            isColNumberValid={isColNumberValid}
            isWinCountValid={isWinCountValid}
            winCount={winCount}
            rowSize={rowSize}
            colSize={colSize}
            onClick={testFunc}
        />)
        fireEvent.click(screen.getByText('Confirm'))
        expect(testFunc).not.toBeCalled();
    });
});