import {EventEmitter} from '../utils/EventEmitter';

import Coordinates from '../interfaces/Coordinates';
import SizeProperties from '../interfaces/SizeProperties';

import {Direction} from './direction.enum';
import {SnakeEvents} from './events.enum';

export class Snake extends EventEmitter {
    /**
     * Направление движение змейки
     */
    private direction: Direction;

    /**
     * Размеры карты
     */
    private boardSize: SizeProperties;

    /**
     * Координаты элементов змейки
     */
    private elements: Coordinates[];

    /**
     *
     */
    private elongation: number;

    public constructor(
        initialX: number,
        initialY: number,
        boardSize: SizeProperties,
        directionInit: Direction)
    {
        super();

        this.elements = [];
        this.elements.push({x : initialX, y : initialY});
        this.direction = directionInit;
        this.boardSize = boardSize;
        this.elongation = 0;
    }

    /**
     * Метод расчета движения змейки
     */
    public move() {
        const lastElement = this.elements[this.elements.length-1];

        /**
         * Увеличение или просто движение
         */
        if (this.elongation) {
            this.elongation--;
        } else {
            this.elements = this.elements.slice(1);
        }

        let newElement: Coordinates;

        /**
         * Движение змейки
         */
        switch(this.direction) {
            case Direction.UP :
                newElement = {x: lastElement.x - 1, y: lastElement.y};
                break;
            case Direction.DOWN :
                newElement = {x: lastElement.x + 1, y: lastElement.y};
                break;
            case Direction.LEFT :
                newElement = {x: lastElement.x, y: lastElement.y - 1};
                break;
            case Direction.RIGHT :
                newElement = {x: lastElement.x, y: lastElement.y + 1};
                break;
            default:
                throw new Error("Unknown direction " + this.direction);
        }

        /**
         * В случае если пройдена стена
         */
        if (newElement.x < 0) {
            newElement.x += this.boardSize.width;
        }
        if (newElement.x >= this.boardSize.width) {
            newElement.x -= this.boardSize.width;
        }
        if (newElement.y < 0) {
            newElement.y += this.boardSize.height;
        }
        if (newElement.y >= this.boardSize.height) {
            newElement.y -= this.boardSize.height;
        }

        this.elements.push(newElement);

        /**
         * Оповещение о том что змейка была перемещена
         */
        this.emit(SnakeEvents.MOVE);

        if (!this.isLastMoveValid()) {
            /**
             * Событие о том что был сделан не "валидный" ход
             */
            this.emit(SnakeEvents.END)
        }
    }

    /**
     * Проверка на то был ли валидным последний ход
     * @returns {boolean}
     */
    public isLastMoveValid() : boolean {
        const lastElement = this.elements[this.elements.length-1];
        let isValid = true;
        this.elements.forEach(element => {
            if (element !== lastElement && element.x === lastElement.x && element.y === lastElement.y) {
                isValid = false;
            }
        });
        return isValid;
    }

    /**
     * Вставить новое направление движения
     */
    public setDirection(direction: Direction) {
        if(!direction) {
            return;
        }

        if (this.getOpposite(direction) === this.direction) {
            return;
        }

        this.direction = direction;
    }

    /**
     * Получить направление движения змейки
     */
    public getDirection() : string {
        return this.direction;
    }

    /**
     * Вернуть координаты элементов змейки
     */
    public getCoords() {
        return this.elements;
    }

    /**
     * Увеличение змейки
     */
    public elongate(size: number) {
        this.elongation = this.elongation + size;
    }

    /**
     * Получение направления движения напротив
     */
    protected getOpposite(direction: Direction) {
        switch(direction) {
            case Direction.UP :
                return Direction.DOWN;
            case Direction.DOWN :
                return Direction.UP;
            case Direction.LEFT :
                return Direction.RIGHT;
            case Direction.RIGHT :
                return Direction.LEFT
        }
    }
}