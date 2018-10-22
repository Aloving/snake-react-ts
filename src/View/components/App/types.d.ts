import {BitMap} from '../../../types/BitMap';

export interface Props {
    bitMap: BitMap;
    score: number;
    keyHandler: (e: KeyboardEvent) => void;
}