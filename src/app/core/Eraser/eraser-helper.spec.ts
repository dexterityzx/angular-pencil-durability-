import Eraser from './eraser';
import EraserHelper from './eraser-helper';

describe('EraserHelper: degrade a eraser', () => {

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

describe('EraserHelper: create a eraser', () => {

    const MAX_DURABILITY = 100;
    let eraser: any;

    beforeEach(() =>
        eraser = EraserHelper.create(MAX_DURABILITY)
    );

    it(`should craete a eraser`, () => {
        expect(eraser instanceof Eraser).toBeTruthy();
    });

    it(`should craete a eraser with a max durability`, () => {
        expect(eraser.maxDurability).toEqual(MAX_DURABILITY);
    });

    it(`should craete a eraser with current durability equals to max durability`, () => {
        expect(eraser.currentDurability).toEqual(MAX_DURABILITY);
    });

});