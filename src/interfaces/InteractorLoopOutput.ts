import {GameStatus} from '../GameInteractor/GameStatus';
import {BitMap} from '../types/BitMap';

export interface InteractorLoopOutput {
    status: GameStatus;
    bitMap: BitMap;
}
