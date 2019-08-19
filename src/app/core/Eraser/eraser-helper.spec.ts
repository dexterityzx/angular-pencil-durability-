import Eraser from './eraser';
import EraserHelper from './eraser-helper';

describe('Eraser Degrader', () => {

    it(`should degrade a eraser and return a new degraded eraser`, () => {

        let durability = 100;
        let eraser = new Eraser(durability);

        const degradeAmount = 1;

        for (let i = 0; i < 10; i++) {
            eraser = EraserHelper.degrade(eraser, degradeAmount);
            expect(eraser instanceof Eraser).toBeTruthy();

            durability -= degradeAmount;
            expect(eraser.currentDurability).toEqual(durability);
        }

    });

});