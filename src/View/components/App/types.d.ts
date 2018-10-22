import {BitMap} from '../../../types/BitMap';

export interface Props {
    bitMap: BitMap;
    keyHandler: (e: KeyboardEvent) => void;
}