import * as React from 'react';

import {Props} from './types';

export class App extends React.PureComponent<Props> {
    public componentDidMount() {
        const {keyHandler} = this.props;

        document.onkeydown = keyHandler;
    }

    public render() {
        const {bitMap} = this.props;

        return (
          <div className="App">
              {bitMap && bitMap.map((row, index) => {
                  return (
                      <div key={index}>
                          {this.makeRow(row)}
                      </div>
                  );
              })}
          </div>
        );
    }

    private makeRow(row: number[]) {
        return row.map((num, index) => {
            return (
                <span key={index}>
                    {
                        num
                            ? <b key={index}>{num}</b>
                            : <span>{num}</span>
                    }
                </span>
            )
        });
    }
}
