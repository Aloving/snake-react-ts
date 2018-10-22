import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux';
import {bindActionCreators} from 'redux';

import {App} from '../../components/App/';

import {keyHandler} from '../../actions/game';

import {Store} from '../../types/Store';
import {DispatchEvents, FromStore} from './types';

const mapStateToProps: MapStateToProps<FromStore, {}, Store> = ({bitMap}) => ({bitMap});
const mapDispatchToProps: MapDispatchToProps<DispatchEvents, {}> = (dispatch) => bindActionCreators(
    {keyHandler},
    dispatch
);

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
