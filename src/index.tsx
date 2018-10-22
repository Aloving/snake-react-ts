import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {AppContainer} from './View/containers/AppContainer';
import {store} from './View/store';

import './View/style.css';

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
  document.getElementById('root') as HTMLElement
);
