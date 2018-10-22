import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {BitMap} from '../../../types/BitMap';
import {GameScreen} from '../../enums/gameStatus';
import {Settings} from '../../types/Settings';
import {Store} from '../../types/Store';

export interface Props {
    bitMap: BitMap;
    score: number;
    screen: GameScreen;
    keyHandler: (e: KeyboardEvent) => void;
    settings: Settings;
    startGame: (setting: Settings) => ThunkAction<void, Store, {}, Action>;
    updateHeight: (height: number) => Action;
    updateSpeed: (speed: number) => Action;
    updateWidth: (width: number) => Action;
    reTry: () => ThunkAction<void, Store, {}, Action>;
}