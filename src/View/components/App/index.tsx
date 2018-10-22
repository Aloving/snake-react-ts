import * as React from 'react';

import {Block} from '../Block';

import {GameScreen} from '../../enums/gameStatus';
import {Props} from './types';

export class App extends React.PureComponent<Props> {
    public componentDidMount() {
        const {keyHandler} = this.props;

        document.onkeydown = keyHandler;
    }

    public render() {
        const {
            bitMap,
            reTry,
            score,
            screen,
            settings,
            startGame,
            updateWidth,
            updateSpeed,
            updateHeight
        } = this.props;

        return (
            <div className='App'>
                <div className='info'>
                  <span>score: {score}</span>
                </div>
                {
                    screen === GameScreen.THE_END &&
                    <div className='popup'>
                        <div>
                            <div>THE_END</div>
                            <button onClick={reTry}>start again</button>
                      </div>
                  </div>
              }
              {
                  screen === GameScreen.SETTINGS &&
                      <div className='popup'>
                          <div>
                              <div>
                                  <label>Высота:</label>
                                  <input
                                      type='input'
                                      value={settings.height}
                                      onChange={(e) => {
                                          updateHeight(+e.target.value)
                                      }}
                                  />
                              </div>
                              <div>
                                  <label>Ширина:</label>
                                  <input
                                      type='input'
                                      value={settings.width}
                                      onChange={(e) => {
                                          updateWidth(+e.target.value)
                                      }}
                                  />
                              </div>

                              <div>
                                  <label>Скорость:</label>
                                  <input
                                      type='input'
                                      value={settings.speed}
                                      onChange={(e) => {
                                          updateSpeed(+e.target.value)
                                      }}
                                  />
                                  <span>1 - 10</span>
                              </div>
                              <button
                                  onClick={() => {
                                      startGame({
                                          height: settings.height,
                                          speed: settings.speed,
                                          width: settings.width
                                      })
                                  }}
                              >
                                  start game
                              </button>
                          </div>
                      </div>
              }
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
