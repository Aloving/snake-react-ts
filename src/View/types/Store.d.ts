import {BitMap} from '../../types/BitMap';

export interface Store {
    score: number;
    bitMap?: BitMap;
}

export interface Action {
    type: string;
    payload: any;
}
