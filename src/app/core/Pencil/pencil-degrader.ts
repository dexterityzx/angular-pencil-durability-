import Degrader from "../../interfaces/degrader";
import Pencil from './pencil';

export default class PencilDegrader implements Degrader<Pencil> {

    degrade(pencil: Pencil, pencilDegradeAmount: number): Pencil {
        let newPencil = Object.assign(new Pencil(0, 0), pencil);
        newPencil.currentDurability = Math.max(newPencil.currentDurability - pencilDegradeAmount, 0);
        return newPencil;
    }

}