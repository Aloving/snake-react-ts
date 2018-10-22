import {ThunkAction} from 'redux-thunk';

import {interactor} from '../interactor';

import {setBitMap} from './game';

import {
    Action,
    Store
} from '../types/Store';

export const startGame = (): ThunkAction<void, Store, {}, Action> => (dispatch) => {
    setInterval(() => {
        const newGameState = interactor.gameLoop();
        dispatch(setBitMap(newGameState.bitMap));
    }, 500);
};
