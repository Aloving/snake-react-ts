import {BitMap} from '../../../types/BitMap';
import {GameScreen} from '../../enums/gameStatus';

export interface Props {
    bitMap: BitMap;
    score: number;
    screen: GameScreen;
    keyHandler: (e: KeyboardEvent) => void;
}