import * as React from 'react';

import {BitMapElement} from '../../../enums/BitMapElements';
import {Props} from './types';

const classNameMap = {
    [BitMapElement.EMPTY]: 'cell_view_empty',
    [BitMapElement.SNAKE]: 'cell_view_snake',
    [BitMapElement.TREAT]: 'cell_view_treat'
};

export const Block: React.SFC<Props> = ({bit}) => (
    <span
        className={`cell ${classNameMap[bit]}`}
    />
);
