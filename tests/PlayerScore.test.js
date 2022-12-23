import renderer from 'react-test-renderer';
import { PlayerScore } from '../src/PlayerScore';

describe('PlayerScore', () => {
    it('renders correctly', () => {
        const name = 'smth';
        const score = 2;
        const player = { name, score };

        const tree = renderer
            .create(<PlayerScore player={player} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
