import {BitMap} from '../../../types/BitMap';
import {GameScreen} from '../../enums/gameStatus';

export interface FromStore {
    bitMap?: BitMap;
    score: number;
    screen: GameScreen;
}

export interface DispatchEvents {
    keyHandler: (e: KeyboardEvent) => void;
}
