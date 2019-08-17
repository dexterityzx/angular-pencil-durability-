import Eraser from './eraser';
import EraserDegrader from './eraser-degrader';

describe('Eraser Degrader', () => {

    it(`should degrade a eraser and return a new degraded eraser`, () => {

        let durability = 100;
        let eraser = new Eraser(durability);

        const degradeAmount = 1;
        const eraserDegrader = new EraserDegrader();

        for (let i = 0; i < 10; i++) {
            eraser = eraserDegrader.degrade(eraser, degradeAmount);
            expect(eraser instanceof Eraser).toBeTruthy();

            durability -= degradeAmount;
            expect(eraser.currentDurability).toEqual(durability);
        }

    });

});