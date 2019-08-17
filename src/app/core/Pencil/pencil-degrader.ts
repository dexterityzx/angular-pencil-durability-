import Degrader from "../../interfaces/degrader";
import Pencil from './pencil';

export default class PencilDegrader implements Degrader<Pencil> {

    degrade(pencil: Pencil, value: number): Pencil {
        let newPencil = Object.assign(new Pencil(0, 0), pencil);
        if (newPencil.currentDurability >= value) {
            newPencil.currentDurability -= value;
        } else {
            newPencil.currentDurability = 0;
        }
        return newPencil;
    }

}