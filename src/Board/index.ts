import Coordinates from '../interfaces/Coordinates';
import SizeProperties from '../interfaces/SizeProperties';

/**
 * Класс игрового поля
 */
export class Board {
    /**
     * Сладость, может быть яблоко, груша или что угодно
     */
    private treat: Coordinates;

    constructor(private sizeProperties: SizeProperties) {
        this.treat = this.calcRandomPosition();
    }

    /**
     * Сгенерировать новую позицию для сладости
     */
    public updateTreat() {
        this.treat = this.calcRandomPosition()
    }

    /**
     * Вернуть размеры поля
     */
    public getSizeProperties() : SizeProperties {
        return this.sizeProperties;
    }

    /**
     * Получить координаты сладости
     */
    public getTreat(): Coordinates {
        return this.treat;
    }

    /**
     * Сгененировать новые координаты
     */
    private calcRandomPosition(): Coordinates {
        const {width, height} = this.sizeProperties;

        return {
            x: Math.floor(Math.random() * height),
            y: Math.floor(Math.random() * width),
        }
    }
}
