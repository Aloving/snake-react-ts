import {Direction} from '../direction.enum';
import {Snake} from '../';

describe('Snake testing', () => {
    it('setDirection and getDirection should set and get the same direction', () => {
        const snake = new Snake(
            0,
            0,
            {
                height: 10,
                width: 10
            },
            Direction.UP
        );

        snake.setDirection(Direction.RIGHT);
        expect(snake.getDirection()).toEqual(Direction.RIGHT);
    });

    it('getCoords should return coords which was initied Snake with', () => {
        const snake = new Snake(
            0,
            0,
            {
                height: 10,
                width: 10
            },
            Direction.UP
        );

        expect(snake.getCoords()).toEqual([{
            x: 0,
            y: 0
        }]);
    });

    describe('setDirection testing', () => {
        it('should not set down direction while snake\'s direction is UP', () => {
            const snake = new Snake(
                0,
                0,
                {
                    height: 10,
                    width: 10
                },
                Direction.UP
            );

            snake.setDirection(Direction.DOWN);
            expect(snake.getDirection()).toEqual(Direction.UP);
        });

        it('should not set UP direction while snake\'s direction is DOWN', () => {
            const snake = new Snake(
                0,
                0,
                {
                     height: 10,
                    width: 10,
                },
                Direction.DOWN
            );

            snake.setDirection(Direction.UP);
            expect(snake.getDirection()).toEqual(Direction.DOWN);
        });

        it('should not set LEFT direction while snake\'s direction is RIGHT', () => {
            const snake = new Snake(
                0,
                0,
                {
                    height: 10,
                    width: 10
                },
                Direction.RIGHT
            );

            snake.setDirection(Direction.LEFT);
            expect(snake.getDirection()).toEqual(Direction.RIGHT);
        });
    });

    describe('isLastMoveValid testing', () => {
        it('just a move', () => {
            const snake = new Snake(
                0,
                0,
                {
                    height: 10,
                    width: 10
                },
                Direction.RIGHT
            );

            snake.move();

            expect(snake.isLastMoveValid()).toBeTruthy();
        });

        it('eat itself', () => {
            const snake = new Snake(
                0,
                0,
                {
                    height: 10,
                    width: 10
                },
                Direction.RIGHT
            );

            /**
             * Увеличиваем размер до 10 чтобы можно было развернуться
             */
            snake.elongate(10);

            /**
             * [][][]
             */
            snake.move();
            snake.move();
            snake.move();
            snake.setDirection(Direction.DOWN);
            /**
             * [][][]
             *     []
             */
            snake.move();
            snake.setDirection(Direction.LEFT);
            /**
             * [][][]
             *   [][]
             */
            snake.move();
            snake.setDirection(Direction.UP);
            /**
             * [][x][]
             *    [][]
             */
            snake.move();


            expect(snake.isLastMoveValid()).toBeFalsy();
        });
    });

    describe('move method testing', () => {
        const initialCoords = {
            x: 0,
            y: 0
        };

        it('move should moving the snake on one coord per move', () => {
            const snake = new Snake(
                initialCoords.x,
                initialCoords.y,
                {
                    height: 10,
                    width: 10
                },
                Direction.RIGHT
            );

            snake.move();

            expect(snake.getCoords()).toEqual([{
                x: 0,
                y: 1
            }]);
        });

        describe('move should move through the wall', () => {
            it('through top x coords', () => {
                const snake = new Snake(
                    0,
                    0,
                    {
                        height: 10,
                        width: 10
                    },
                    Direction.UP
                );

                snake.move();

                expect(snake.getCoords()).toEqual([{
                    x: 9,
                    y: 0
                }]);
            });

            it('through bottom x coords', () => {
                const snake = new Snake(
                    10,
                    0,
                    {
                        height: 10,
                        width: 10
                    },
                    Direction.DOWN
                );

                snake.move();

                expect(snake.getCoords()).toEqual([{
                    x: 1,
                    y: 0
                }]);
            });

            it('throught the left wall', () => {
                const snake = new Snake(
                    0,
                    0,
                    {
                        height: 10,
                        width: 10
                    },
                    Direction.LEFT
                );

                snake.move();

                expect(snake.getCoords()).toEqual([{
                    x: 0,
                    y: 9
                }]);
            });

            it('throught the right wall', () => {
                const snake = new Snake(
                    0,
                    10,
                    {
                        height: 10,
                        width: 10
                    },
                    Direction.RIGHT
                );

                snake.move();

                expect(snake.getCoords()).toEqual([{
                    x: 0,
                    y: 1
                }]);
            });
        });

        describe('directions', () => {
            it('moving with while direction equal right', () => {
                const snake = new Snake(
                    0,
                    0,
                    {
                        height: 10,
                        width: 10
                    },
                    Direction.RIGHT
                );

                snake.move();

                expect(snake.getCoords()).toEqual([{
                    x: 0,
                    y: 1
                }]);
            });

            it('moving with while direction equal left', () => {
                const snake = new Snake(
                    0,
                    1,
                    {
                        height: 10,
                        width: 10
                    },
                    Direction.LEFT
                );

                snake.move();

                expect(snake.getCoords()).toEqual([{
                    x: 0,
                    y: 0
                }]);
            });

            it('moving with while direction equal up', () => {
                const snake = new Snake(
                    1,
                    0,
                    {
                        height: 10,
                        width: 10
                    },
                    Direction.UP
                );

                snake.move();

                expect(snake.getCoords()).toEqual([{
                    x: 0,
                    y: 0
                }]);
            });

            it('moving with while direction equal down', () => {
                const snake = new Snake(
                    0,
                    0,
                    {
                        height: 10,
                        width: 10
                    },
                    Direction.DOWN
                );

                snake.move();

                expect(snake.getCoords()).toEqual([{
                    x: 1,
                    y: 0
                }]);
            });
        });
    });
});
