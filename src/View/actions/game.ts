import {ThunkAction} from 'redux-thunk';

import {interactor} from '../interactor';

import {BitMap} from '../../types/BitMap';
import {ViewGameAction} from '../enums/actions/game';

import {Action, Store} from '../types/Store';

export const setBitMap = (bitMap: BitMap) => ({
   payload: bitMap,
   type: ViewGameAction.SET_BIT_MAP
});

export const keyHandler = (e: KeyboardEvent): ThunkAction<void, Store, {}, Action> => () => {
    interactor.keyHandler(e);
};

