import {Board} from '../index';

describe('Board testing', () => {
    const initialBoardSizes = {
        height: 30,
        width: 30
    };
    it('getSizeProperties should return the sizes which Board was initied with', () => {
        const board = new Board(initialBoardSizes);

        expect(board.getSizeProperties()).toEqual(initialBoardSizes);
    });

    it('updateTreat method should update treat position', () => {
        const board = new Board(initialBoardSizes);
        const firstTreatPosition = {...board.getTreat()};

        board.updateTreat();

        expect(firstTreatPosition).not.toEqual(board.getTreat());
    });
});