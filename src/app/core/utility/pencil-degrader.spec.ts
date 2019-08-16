import PencilDegrader from "./pencil-degrader";
import Pencil from '../entity/pencil';

describe('Pencil Degrader', () => {

    it(`should degrade a pencil and return a new degraded pencil`, () => {

        let durability = 100;
        let pencil = new Pencil(durability, 50);

        const degradeAmount = 1;
        const pencilDegrader = new PencilDegrader();

        for (let i = 0; i < 10; i++) {
            pencil = pencilDegrader.degrade(pencil, degradeAmount);
            expect(pencil instanceof Pencil).toBeTruthy();

            durability -= degradeAmount;
            expect(pencil.currentDurability).toEqual(durability);
        }

    });

});