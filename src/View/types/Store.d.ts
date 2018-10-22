import {BitMap} from '../../types/BitMap';
import {GameScreen} from '../enums/gameStatus';

export interface Store {
    score: number;
    bitMap?: BitMap;
    screen: GameScreen;
}

export interface Action {
    type: string;
    payload: any;
}
