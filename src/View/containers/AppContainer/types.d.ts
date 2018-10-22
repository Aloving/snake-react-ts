import {BitMap} from '../../../types/BitMap';

export interface FromStore {
    bitMap?: BitMap;
}

export interface DispatchEvents {
    keyHandler: (e: KeyboardEvent) => void;
}
