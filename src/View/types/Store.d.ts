import {BitMap} from '../../types/BitMap';
import {GameScreen} from '../enums/gameStatus';
import {Settings} from './Settings';

export interface Store {
    score: number;
    bitMap?: BitMap;
    screen: GameScreen;
    settings: Settings;
}

export interface Action {
    type: string;
    payload: any;
}
