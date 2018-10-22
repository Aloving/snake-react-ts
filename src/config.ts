import Coordinates from './interfaces/Coordinates';
import {Direction} from './Snake/direction.enum';

interface Config {
    initialSnakePosition: Coordinates;
    initialDirection: Direction;
}

export const config: Config = {
    initialDirection: Direction.RIGHT,
    initialSnakePosition: {
        x: 2,
        y: 2
    }
};
