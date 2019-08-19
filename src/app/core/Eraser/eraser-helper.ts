import Degrader from "../interfaces/degrader";
import Eraser from './eraser';
import staticImplements from '../decorator/staticImplement.decorator';

@staticImplements<Degrader<Eraser>>()
export default class EraserHelper {
    //this will degarde a eraser with a value.
    static degrade(eraser: Eraser, value: number): Eraser {
        let newEraser = Object.assign(new Eraser(0), eraser);
        if (newEraser.currentDurability >= value) {
            newEraser.currentDurability -= value;
        } else {
            newEraser.currentDurability = 0;
        }
        return newEraser;
    }
    // this will return a new earser with desired max durability
    static create(maxDurability: number) {
        maxDurability = Math.max(maxDurability, 1);
        return new Eraser(maxDurability);
    }

}