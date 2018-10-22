import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux';
import {bindActionCreators} from 'redux';

import {App} from '../../components/App/';

import {keyHandler} from '../../actions/game';
import {reTry} from '../../actions/game';
import {updateHeight, updateSpeed, updateWidth} from '../../actions/settings';
import {startGame} from '../../actions/startGame';

import {Store} from '../../types/Store';
import {DispatchEvents, FromStore} from './types';

const mapStateToProps: MapStateToProps<FromStore, {}, Store> = ({
    bitMap,
    screen,
    score,
    settings
}) => ({
    bitMap,
    score,
    screen,
    settings
});
const mapDispatchToProps: MapDispatchToProps<DispatchEvents, {}> = (dispatch) => bindActionCreators(
    {
        keyHandler,
        reTry,
        startGame,
        updateHeight,
        updateSpeed,
        updateWidth
    },
    dispatch
);

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
