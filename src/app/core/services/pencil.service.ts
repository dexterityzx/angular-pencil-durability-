import { Injectable } from '@angular/core';
import PencilDegrader from '../Pencil/pencil-degrader';
import Pencil from '../Pencil/pencil';
import Paper from '../paper/paper';
/***** private *****/
// settings
const PENCIL_DEGRADE_AMOUNT_LOWER = 1;
const PENCIL_DEGRADE_AMOUNT_UPPER = 2;
// properties
const _pencilDegrader: PencilDegrader = new PencilDegrader();
// methods
const _getDegradeAmount = (char) => {

  if (char === "\n") {
    return 0;
  }

  if (char === " ") {
    return 0;
  }

  if (char === char.toLowerCase()) {
    return PENCIL_DEGRADE_AMOUNT_LOWER;
  }

  if (char === char.toUpperCase()) {
    return PENCIL_DEGRADE_AMOUNT_UPPER;
  }
};

@Injectable({
  providedIn: 'root'
})
export class PencilService {

  constructor() {
  }

  //edit() is to modify an existing string
  edit(paper: Paper, pencil: Pencil, input: string, startFrom: number = 0) {
    if (pencil.currentDurability === 0) return pencil;

    const inputArray = input.split('');
    let writeIndex = Math.max(Math.min(paper.chars.length, startFrom), 0);
    inputArray.forEach(char => {
      if (pencil.currentDurability === 0) return;

      let degradeAmount = _getDegradeAmount(char);
      if (pencil.currentDurability >= degradeAmount) {
        if (paper.chars[writeIndex] === " ") {
          paper.chars[writeIndex] = char
        } else {
          // if we need to overwrite this index, we write @
          paper.chars[writeIndex] = "@"
        }
        writeIndex++;
        pencil = _pencilDegrader.degrade(pencil, degradeAmount);
      }
    });
    return pencil
  }

  //write() is to append chars in the end
  write(paper: Paper, pencil: Pencil, input: string) {
    if (pencil.currentLength === 0) return pencil;

    const inputArray = input.split('');
    let writeIndex = paper.chars.length;
    inputArray.forEach(char => {
      let degradeAmount = _getDegradeAmount(char);

      if (pencil.currentDurability < degradeAmount) {
        paper.chars[writeIndex] = " ";
      } else {
        paper.chars[writeIndex] = char
      }

      pencil = _pencilDegrader.degrade(pencil, degradeAmount);
      writeIndex++;
    });
    return pencil
  }

}
