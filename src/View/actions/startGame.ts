import {ThunkAction} from 'redux-thunk';

import {interactor} from '../interactor';

import {setBitMap, updateScore} from './game';

import {
    Action,
    Store
} from '../types/Store';

export const startGame = (): ThunkAction<void, Store, {}, Action> => (dispatch) => {
    setInterval(() => {
        const {bitMap, score} = interactor.gameLoop();
        dispatch(updateScore(score));
        dispatch(setBitMap(bitMap));
    }, 500);
};
