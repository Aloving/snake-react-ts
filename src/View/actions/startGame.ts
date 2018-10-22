import {ThunkAction} from 'redux-thunk';

import {interactor} from '../interactor';

import {
    setBitMap,
    setGameScreen,
    updateScore
} from './game';

import {GameStatus} from '../../GameInteractor/GameStatus';
import {GameScreen} from '../enums/gameStatus';
import {Settings} from '../types/Settings';
import {
    Action,
    Store
} from '../types/Store';

export const startGame = (
    {
        width,
        height,
        speed
    }: Settings
): ThunkAction<void, Store, {}, Action> => (dispatch) => {
    interactor.newGame({
        height,
        width
    });

    dispatch(setGameScreen(GameScreen.PLAYING));

    const startGame = setInterval(() => {
        const {bitMap, score, status} = interactor.gameLoop();

        if (status === GameStatus.STILL_PLAYING) {
            dispatch(updateScore(score));
            dispatch(setBitMap(bitMap));
        } else if (status === GameStatus.THE_END) {
            clearInterval(startGame);
            dispatch(setGameScreen(GameScreen.THE_END));
        }
    }, speed);
};
