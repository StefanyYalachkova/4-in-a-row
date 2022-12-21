import { MIN_VALID_NAME_LENGTH, MIN_VALID_ROW_COL_NUMBER, MIN_VALID_WINCOUNT_NUMBER, PLAYER_ONE, PLAYER_TWO } from "./constValue";

const isValidUsername = (name, value) => {
    const isValidName = value.length >= MIN_VALID_NAME_LENGTH;

    switch (name) {
        case PLAYER_ONE:
        case PLAYER_TWO:
            return isValidName;
        default:
            break;
    };
};

const isValidNumber = (name, value) => {
    const isValid = Number(value) >= MIN_VALID_ROW_COL_NUMBER;
    const isValidWinCount = Number(value) >= MIN_VALID_WINCOUNT_NUMBER;

    switch (name) {
        case 'rows':
        case 'columns':
            return isValid;
        case 'winCount':
            return isValidWinCount;
        default:
            break;
    };
};

export { isValidUsername, isValidNumber };
