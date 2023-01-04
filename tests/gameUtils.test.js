import { PLAYER_ONE } from '../src/constValue';
import { isValidNumber, isValidUsername } from '../src/gameUtils';


describe("isValidUsername", () => {
    it('checking name length >= 3', () => {
        expect(isValidUsername(PLAYER_ONE, 'Stef')).toBe(true);
        expect(isValidUsername(PLAYER_ONE, 'Ste')).toBe(true);
        expect(isValidUsername(PLAYER_ONE, 'St')).toBe(false);
    });
});

describe("isValidNumber for row", () => {
    it('checking number length >= 4', () => {
        expect(isValidNumber('rows', 4)).toBe(true);
        expect(isValidNumber('rows', 5)).toBe(true);
        expect(isValidNumber('rows', 3)).toBe(false);
    });
});

describe("isValidNumber for col", () => {
    it('checking number length >= 4', () => {
        expect(isValidNumber('columns', 4)).toBe(true);
        expect(isValidNumber('columns', 5)).toBe(true);
        expect(isValidNumber('columns', 3)).toBe(false);
    });
});

describe("isValidNumber for winCount", () => {
    it('checking winCount number length >= 2', () => {
        expect(isValidNumber('winCount', 2)).toBe(true);
        expect(isValidNumber('winCount', 3)).toBe(true);
        expect(isValidNumber('winCount', 1)).toBe(false);
    });

});

