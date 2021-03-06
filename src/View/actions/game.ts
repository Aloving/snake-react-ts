import {ThunkAction} from 'redux-thunk';

import {interactor} from '../interactor';

import {BitMap} from '../../types/BitMap';
import {ViewGameAction} from '../enums/actions/game';

import {GameScreen} from '../enums/gameStatus';
import {Action, Store} from '../types/Store';
import {startGame} from './startGame';

export const setBitMap = (bitMap: BitMap) => ({
   payload: bitMap,
   type: ViewGameAction.SET_BIT_MAP
});

export const updateScore = (score: number) => ({
    payload: score,
    type: ViewGameAction.UPDATE_SCORE
});

export const setGameScreen = (screen: GameScreen) => ({
    payload: screen,
    type: ViewGameAction.SET_GAME_SCREEN
});

export const keyHandler = (e: KeyboardEvent): ThunkAction<void, Store, {}, Action> => () => {
    interactor.keyHandler(e);
};

export const reTry = (): ThunkAction<void, Store, {}, Action> => (dispatch, getStoreState) => {
    const state: Store = getStoreState();

    dispatch(startGame(state.settings));
};

