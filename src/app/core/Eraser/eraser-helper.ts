import Degrader from "../interfaces/degrader";
import Eraser from './eraser';
import staticImplements from '../decorator/staticImplement.decorator';

@staticImplements<Degrader<Eraser>>()
export default class EraserHelper {

    static degrade(eraser: Eraser, value: number): Eraser {
        let newEraser = Object.assign(new Eraser(0), eraser);
        if (newEraser.currentDurability >= value) {
            newEraser.currentDurability -= value;
        } else {
            newEraser.currentDurability = 0;
        }
        return newEraser;
    }

    static create(maxDurability: number) {
        maxDurability = Math.max(maxDurability, 1);
        return new Eraser(maxDurability);
    }

}