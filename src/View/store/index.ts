import {
    applyMiddleware,
    createStore
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import {startGame} from '../actions/startGame';

import {mainReducer} from '../reducers';

export const store = createStore(mainReducer, applyMiddleware(thunk, logger));

store.dispatch<any>(startGame());
