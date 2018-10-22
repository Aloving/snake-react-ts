import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {BitMap} from '../../../types/BitMap';
import {GameScreen} from '../../enums/gameStatus';
import {Settings} from '../../types/Settings';
import {Store} from '../../types/Store';

export interface FromStore {
    bitMap?: BitMap;
    score: number;
    screen: GameScreen;
    settings: Settings;
}

export interface DispatchEvents {
    keyHandler: (e: KeyboardEvent) => void;
    updateHeight: (height: number) => Action;
    updateSpeed: (speed: number) => Action;
    updateWidth: (width: number) => Action;
    startGame: (setting: Settings) => ThunkAction<void, Store, {}, Action>;
}
