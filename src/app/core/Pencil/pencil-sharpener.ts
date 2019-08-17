import Pencil from './pencil';

export default class PencilSharpener {
    sharpen(pencil: Pencil, lengthDegradeAmount: number = 1) {
        let newPencil = Object.assign(new Pencil(0, 0), pencil);
        newPencil.currentLength = Math.max(newPencil.currentLength - lengthDegradeAmount, 0);
        newPencil.currentDurability = newPencil.currentLength > 0 ? newPencil.maxDurability : 0;
        return newPencil;
    }
}