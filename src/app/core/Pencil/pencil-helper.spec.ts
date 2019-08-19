import Pencil from './pencil';
import PencilHelper from './pencil-helper';

describe('PencilHelper : sharpen a pencil', () => {
    const MAX_DURABILITY = 100;
    const MAX_LENGTH = 50;
    const DURABILITY_DEGRADE_AMOUNT = 50;
    const LENGTH_DEGRADE_AMOUNT = 1;

    let _pencilHelper: PencilHelper;
    let _pencil: Pencil;

    beforeAll(() => {
        _pencilHelper = new PencilHelper();
    });

    beforeEach(() => {
        _pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
        _pencil = _pencilHelper.degrade(_pencil, DURABILITY_DEGRADE_AMOUNT);
    });

    it(`should sharpen a pencil and return a new pencil`, () => {
        _pencil = _pencilHelper.sharpen(_pencil)
        expect(_pencil instanceof Pencil).toBeTruthy(MAX_DURABILITY);
    });

    it(`should sharpen a pencil and refresh a pencil's current durability to max durability`, () => {

        _pencil = _pencilHelper.sharpen(_pencil)
        expect(_pencil.currentDurability).toBe(MAX_DURABILITY);
    });

    it(`should sharpen a pencil and reduce a pencil's length by amount of length degradation`, () => {
        _pencil = _pencilHelper.sharpen(_pencil)
        expect(_pencil.currentLength).toBe(MAX_LENGTH - LENGTH_DEGRADE_AMOUNT);
    });

    it(`should not make a pencil's length less than 0`, () => {
        _pencil = _pencilHelper.sharpen(_pencil, MAX_LENGTH + 1)
        expect(_pencil.currentLength).toBeGreaterThanOrEqual(0);
    });

    it(`should not change max durability`, () => {
        _pencil = _pencilHelper.sharpen(_pencil)
        expect(_pencil.maxDurability).toBe(MAX_DURABILITY);
    });

    it(`should not change max length`, () => {
        _pencil = _pencilHelper.sharpen(_pencil)
        expect(_pencil.maxLength).toBe(MAX_LENGTH);
    });

});

describe('PenciHelper : degrade a pencil', () => {

    it(`should degrade a pencil and return a new degraded pencil`, () => {

        let durability = 100;
        let pencil = new Pencil(durability, 50);

        const degradeAmount = 1;
        const pencilHelper = new PencilHelper();

        for (let i = 0; i < 10; i++) {
            pencil = pencilHelper.degrade(pencil, degradeAmount);
            expect(pencil instanceof Pencil).toBeTruthy();

            durability -= degradeAmount;
            expect(pencil.currentDurability).toEqual(durability);
        }

    });

});