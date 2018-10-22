import {browserBinds} from './KeyBindings';

import {Direction} from '../Snake/direction.enum';
import {GameControllerType} from './GameControllerType.enum';

export class GameController {
    constructor(private type: GameControllerType) {}

    /**
     * Получение обработчика
     * @returns {(e: KeyboardEvent) => Direction}
     */
    public handler() {
        return this.handlersFactory();
    }

    /**
     * Получение нужного обработчика по типу
     */
    private handlersFactory() {
        switch (this.type) {
            case GameControllerType.BROWSER: {
                return this.browserHandler
            }

            default: {
                return this.browserHandler
            }
        }
    }

    /**
     * Простой браузерный обработчик, получение направление в зависимости от нажатой клавиши
     * @param {KeyboardEvent} e Нажатая клавиша
     * @returns {Direction}
     */
    private browserHandler = (e: KeyboardEvent): Direction => {
        const key = e.keyCode;

        return browserBinds[key] || '';
    }
}