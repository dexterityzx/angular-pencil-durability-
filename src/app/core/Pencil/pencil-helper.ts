import Degrader from "../interfaces/degrader";
import Pencil from './pencil';
import staticImplements from '../decorator/staticImplement.decorator';

@staticImplements<Degrader<Pencil>>()
export default class PencilHelper {

    static degrade(pencil: Pencil, pencilDegradeAmount: number): Pencil {
        let newPencil = Object.assign(new Pencil(0, 0), pencil);
        newPencil.currentDurability = Math.max(newPencil.currentDurability - pencilDegradeAmount, 0);
        return newPencil;
    }

    static sharpen(pencil: Pencil, lengthDegradeAmount: number = 1) {
        let newPencil = Object.assign(new Pencil(0, 0), pencil);
        newPencil.currentLength = Math.max(newPencil.currentLength - lengthDegradeAmount, 0);
        newPencil.currentDurability = newPencil.currentLength > 0 ? newPencil.maxDurability : 0;
        return newPencil;
    }

    static create(maxDurability: number, maxLength: number) {
        maxDurability = Math.max(maxDurability, 1);
        maxLength = Math.max(maxLength, 1);
        return new Pencil(maxDurability, maxLength);
    }

}