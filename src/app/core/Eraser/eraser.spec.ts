import Eraser from "./eraser";

describe('Eraser Entity', () => {

    it(`should have max durability`, () => {
        const eraser = new Eraser(100);
        expect(eraser.maxDurability).toEqual(100);
    });

    it(`should have current durability`, () => {
        const eraser = new Eraser(100);
        expect(eraser.currentDurability).toEqual(100);
    });

});
