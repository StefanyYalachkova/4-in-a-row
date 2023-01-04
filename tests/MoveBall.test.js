import renderer from 'react-test-renderer';
import { getBallInitialValue, MoveBall } from "../src/MoveBall";

describe("getBallInitialValue", () => {
    it('checking ball initial value with empty ball', () => {
        const expectedResult = [];
        expect(getBallInitialValue({}, 0)).toEqual(expectedResult);
    });
    it('checking player One ball initial value', () => {
        const expectedResult = [
            { isPlayerOneBall: false, isPlayerTwoBall: false },
            { isPlayerOneBall: true, isPlayerTwoBall: false },
            { isPlayerOneBall: false, isPlayerTwoBall: false },
            { isPlayerOneBall: false, isPlayerTwoBall: false },
        ];
        expect(getBallInitialValue({ isPlayerOneBall: true, isPlayerTwoBall: false }, 4)).toEqual(expectedResult);
    });
    it('checking player Two ball initial value', () => {
        const expectedResult = [
            { isPlayerOneBall: false, isPlayerTwoBall: false },
            { isPlayerOneBall: false, isPlayerTwoBall: true },
        ];
        expect(getBallInitialValue({ isPlayerOneBall: false, isPlayerTwoBall: true }, 2)).toEqual(expectedResult);
    });
});

describe('MoveBall test', () => {
    it('renders correctly', () => {
        const colSize = 4;
        const ref = jest.fn();
        const displayBoard = jest.fn();
        const tree = renderer
            .create(<MoveBall colSize={colSize} ref={ref} displayBoard={displayBoard} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});