import {BitMap} from '../../../types/BitMap';

export interface FromStore {
    bitMap?: BitMap;
    score: number;
}

export interface DispatchEvents {
    keyHandler: (e: KeyboardEvent) => void;
}
