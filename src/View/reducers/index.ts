import {Reducer} from 'redux';

import {ViewGameAction} from '../enums/actions/game';
import {SettingsAction} from '../enums/actions/settings';
import {GameScreen} from '../enums/gameStatus';
import {Store} from '../types/Store';

const initialState: Store = {
    score: 0,
    screen: GameScreen.SETTINGS,
    settings: {
        height: 0,
        speed: 0,
        width: 0
    }
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

        case ViewGameAction.SET_GAME_SCREEN: {
            return {
                ...state,
                screen: payload
            };
        }

        case SettingsAction.WIDTH: {
            return {
                ...state,
                settings: {
                    ...state.settings,
                    width: payload
                }
            }
        }

        case SettingsAction.HEIGHT: {
            return {
                ...state,
                settings: {
                    ...state.settings,
                    height: payload
                }
            }
        }

        case SettingsAction.SPEED: {
            return {
                ...state,
                settings: {
                    ...state.settings,
                    speed: payload
                }
            }
        }

        default:
            return state;
    }
};
