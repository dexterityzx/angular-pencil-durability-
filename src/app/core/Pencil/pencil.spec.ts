import Pencil from "./pencil";

describe('Pencil Entity', () => {

    it(`should have max durability`, () => {
        const pencil = new Pencil(100, 50);
        expect(pencil.maxDurability).toEqual(100);
    });

    it(`should have current durability`, () => {
        const pencil = new Pencil(100, 50);
        expect(pencil.currentDurability).toEqual(100);
    });

    it(`should have max length`, () => {
        const pencil = new Pencil(100, 50);
        expect(pencil.maxLength).toEqual(50);
    });

    it(`should have current length`, () => {
        const pencil = new Pencil(100, 50);
        expect(pencil.currentLength).toEqual(50);
    });

});
