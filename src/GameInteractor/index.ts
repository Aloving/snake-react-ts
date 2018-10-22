import {Board} from '../Board';
import {BitMapElements} from '../enums/BitMapElements';
import {GameController} from '../GameController';
import {InteractorLoopOutput} from '../interfaces/InteractorLoopOutput';
import {Snake} from '../Snake';
import {BitMap} from '../types/BitMap';
import {GameStatus} from './GameStatus';

import {GameControllerType} from '../GameController/GameControllerType.enum';
import SizeProperties from '../interfaces/SizeProperties';
import {SnakeEvents} from '../Snake/events.enum';

import {config} from '../config';
import {Direction} from '../Snake/direction.enum';

export class GameInteractor {
    private snake: Snake;
    private board: Board;
    private controller: (e: KeyboardEvent) => Direction;

    constructor(
        boardSizes: SizeProperties,
        speed: number
    ) {
        this.board = new Board(boardSizes);
        this.snake = new Snake(
            config.initialSnakePosition.x,
            config.initialSnakePosition.y,
            boardSizes,
            config.initialDirection
        );

        this.snake.on(SnakeEvents.MOVE, this.checkTreatCollision);
        this.controller = new GameController(GameControllerType.BROWSER).handler();
    }

    /**
     * Цикл игры
     */
    public gameLoop(): InteractorLoopOutput {
        this.snake.move();

        return {
            bitMap: this.makeBitMap(),
            status: this.prepareGameStatus()
        }
    }

    /**
     * Указать направление змейке
     * @param {Direction} direction
     */
    public keyHandler(e: KeyboardEvent) {
        const direction = this.controller(e);

        this.snake.setDirection(direction);
    }

    /**
     * Сконструировать бит мап
     */
    private makeBitMap(): BitMap {
        const snakeCoords = this.snake.getCoords();
        const boardCoords = this.board.getSizeProperties();
        const treatCoords = this.board.getTreat();

        const snakeMap = snakeCoords.reduce((res, {x, y}) => {
            res[this.createHashKeyByXY(x, y)] = BitMapElements.SNAKE;

            return res;
        }, {});

        const treatMap = {
            [this.createHashKeyByXY(treatCoords.x, treatCoords.y)]: BitMapElements.TREAT
        };

        // const emptyMap = {};

        const twoDMap: number[][] = [];


        // for (let i = 0; i < boardCoords.width; i++) {
        //     let row = [];
        //     for(let j = 0; j < boardCoords.height; j++) {
        //         const itsHashKey = this.createHashKeyByXY(i, j);
        //
        //         emptyMap[itsHashKey] = BitMapElements.EMPTY;
        //     }
        // }

        for (let i = 0; i < boardCoords.width; i++) {
            const row: number[] = [];
            for(let j = 0; j < boardCoords.height; j++) {
                const itsHashKey = this.createHashKeyByXY(i, j);

                if (snakeMap[itsHashKey]) {
                    row.push(BitMapElements.SNAKE);
                    continue;
                }

                if (treatMap[itsHashKey]) {
                    row.push(BitMapElements.TREAT);
                    continue;
                }

                row.push(BitMapElements.EMPTY);
            }
            twoDMap.push(row);
        }

        return twoDMap;
    }

    /**
     * Хеш функция для бит мапы
     */
    private createHashKeyByXY(x: number, y: number) {
        return `${x}-${y}`;
    }

    /**
     * Подготовить статус игры
     * Если последний ход не навредил змейке то игра продолжается
     */
    private prepareGameStatus(): GameStatus {
        const isLastMovingValid = this.snake.isLastMoveValid();

        return isLastMovingValid ? GameStatus.STILL_PLAYING : GameStatus.THE_END;
    }

    /**
     * Проверка того скушала ли змейка сладость
     */
    private checkTreatCollision = () => {
        const treatCoords = this.board.getTreat();

        this.snake.getCoords().forEach(coord => {
            if (coord.x === treatCoords.x && coord.y === treatCoords.y) {
                this.snake.elongate(1);
                this.board.updateTreat();
            }
        });
    }
}