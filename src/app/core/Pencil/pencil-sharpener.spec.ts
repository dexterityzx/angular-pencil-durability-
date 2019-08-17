import PencilDegrader from "./pencil-degrader";
import Pencil from './pencil';
import PencilSharpener from './pencil-sharpener';

describe('Pencil Sharpener', () => {
    const MAX_DURABILITY = 100;
    const MAX_LENGTH = 50;
    const DURABILITY_DEGRADE_AMOUNT = 50;
    const LENGTH_DEGRADE_AMOUNT = 1;

    let _pencilDegrader: PencilDegrader;
    let _pencilSharpener: PencilSharpener;
    let _pencil: Pencil;

    beforeAll(() => {
        _pencilDegrader = new PencilDegrader();
        _pencilSharpener = new PencilSharpener();
    });

    beforeEach(() => {
        _pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
        _pencil = _pencilDegrader.degrade(_pencil, DURABILITY_DEGRADE_AMOUNT);
    });

    it(`should sharpen a pencil and return a new pencil`, () => {
        _pencil = _pencilSharpener.sharpen(_pencil)
        expect(_pencil instanceof Pencil).toBeTruthy(MAX_DURABILITY);
    });

    it(`should sharpen a pencil and refresh a pencil's current durability to max durability`, () => {

        _pencil = _pencilSharpener.sharpen(_pencil)
        expect(_pencil.currentDurability).toBe(MAX_DURABILITY);
    });

    it(`should sharpen a pencil and reduce a pencil's length by amount of length degradation`, () => {
        _pencil = _pencilSharpener.sharpen(_pencil)
        expect(_pencil.currentLength).toBe(MAX_LENGTH - LENGTH_DEGRADE_AMOUNT);
    });

    it(`should not make a pencil's length less than 0`, () => {
        _pencil = _pencilSharpener.sharpen(_pencil, MAX_LENGTH + 1)
        expect(_pencil.currentLength).toBeGreaterThanOrEqual(0);
    });

    it(`should not change max durability`, () => {
        _pencil = _pencilSharpener.sharpen(_pencil)
        expect(_pencil.maxDurability).toBe(MAX_DURABILITY);
    });

    it(`should not change max length`, () => {
        _pencil = _pencilSharpener.sharpen(_pencil)
        expect(_pencil.maxLength).toBe(MAX_LENGTH);
    });

});