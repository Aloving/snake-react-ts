import {Reducer} from 'redux';

import {ViewGameAction} from '../enums/actions/game';
import {Store} from '../types/Store';

const initialState: Store = {
    score: 0
};

export const mainReducer: Reducer<Store> = (state = initialState, {type, payload}) => {
    switch (type) {

        case ViewGameAction.SET_BIT_MAP: {
            return {
                ...state,
                bitMap: payload
            }
        }

        case ViewGameAction.UPDATE_SCORE: {
            return {
                ...state,
                score: payload
            }
        }

        default:
            return state;
    }
};
