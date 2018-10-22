import * as React from 'react';

import {Block} from '../Block';

import {Props} from './types';

export class App extends React.PureComponent<Props> {
    public componentDidMount() {
        const {keyHandler} = this.props;

        document.onkeydown = keyHandler;
    }

    public render() {
        const {bitMap, score} = this.props;

        return (
          <div className='App'>
              <div className='info'>
                  <span>score: {score}</span>
              </div>
              <div className='board'>
                  {bitMap && bitMap.map((row, index) => {
                      return (
                          <div key={index}>
                              {this.makeRow(row)}
                          </div>
                      );
                  })}
              </div>
          </div>
        );
    }

    private makeRow(row: number[]) {
        return row.map((num, index) => <Block bit={num} key={index}/>);
    }
}
