import Degrader from "./degrader";
import Eraser from '../entity/eraser';

export default class EraserDegrader implements Degrader<Eraser> {

    degrade(eraser: Eraser, value: number): Eraser {
        let newEraser = Object.assign(new Eraser(0), eraser);
        if (newEraser.currentDurability >= value) {
            newEraser.currentDurability -= value;
        } else {
            newEraser.currentDurability = 0;
        }
        return newEraser;
    }

}