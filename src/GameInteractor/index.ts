import {Board} from '../Board';
import {BitMapElement} from '../enums/BitMapElements';
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
    private score: number;

    constructor(boardSizes: SizeProperties) {
        this.board = new Board(boardSizes);
        this.snake = new Snake(
            config.initialSnakePosition.x,
            config.initialSnakePosition.y,
            boardSizes,
            config.initialDirection
        );

        this.controller = new GameController(GameControllerType.BROWSER).handler();
        this.score = 0;
    }

    /**
     * Цикл игры
     */
    public gameLoop(): InteractorLoopOutput {
        this.snake.move();

        return {
            bitMap: this.makeBitMap(),
            score: this.getScore(),
            status: this.prepareGameStatus()
        }
    }

    /**
     * Обновление счета
     */
    public updateScore(score: number) {
        this.score = score;
    }

    /**
     * Создание новой игры
     * @param {SizeProperties} boardSizes
     */
    public newGame(boardSizes: SizeProperties) {
        this.board = new Board(
            boardSizes
        );

        this.snake = new Snake(
            config.initialSnakePosition.x,
            config.initialSnakePosition.y,
            boardSizes,
            config.initialDirection
        );
        this.snake.on(SnakeEvents.MOVE, this.checkTreatCollision);
    }

    /**
     * Получение счетчика
     */
    public getScore(): number {
        return this.score;
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
            res[this.createHashKeyByXY(x, y)] = BitMapElement.SNAKE;

            return res;
        }, {});

        const treatMap = {
            [this.createHashKeyByXY(treatCoords.x, treatCoords.y)]: BitMapElement.TREAT
        };

        const twoDMap: number[][] = [];

        for (let i = 0; i < boardCoords.width; i++) {
            const row: number[] = [];
            for(let j = 0; j < boardCoords.height; j++) {
                const itsHashKey = this.createHashKeyByXY(i, j);

                if (snakeMap[itsHashKey]) {
                    row.push(BitMapElement.SNAKE);
                    continue;
                }

                if (treatMap[itsHashKey]) {
                    row.push(BitMapElement.TREAT);
                    continue;
                }

                row.push(BitMapElement.EMPTY);
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
                this.score += 1;
            }
        });
    }
}