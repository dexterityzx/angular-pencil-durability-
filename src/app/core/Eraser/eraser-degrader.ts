import Degrader from "../interfaces/degrader";
import Eraser from './eraser';

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