import { Injectable } from '@angular/core';
import Pencil from '../pencil/pencil';
import Paper from '../paper/paper';
import PaperHelper from '../paper/paper-helper';
import PencilHelper from '../pencil/pencil-helper';
/***** private *****/
// constants
const PENCIL_DEGRADE_AMOUNT_LOWER = 1;
const PENCIL_DEGRADE_AMOUNT_UPPER = 2;
// methods
const _getDegradeAmount = (char) => {
  if (!char) {
    return 0;
  }

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
  edit(paper: Paper, pencil: Pencil, input: string, startFrom: number = 0): { pencil: Pencil, paper: Paper } {
    if (pencil.currentDurability === 0) return { pencil, paper };

    const inputArray = input.split('');
    const paparTextLength = PaperHelper.readString(paper).length
    let writeIndex = Math.max(Math.min(paparTextLength, startFrom), 0);
    inputArray.forEach(char => {
      if (pencil.currentDurability === 0) return;
      if (writeIndex >= paparTextLength) return;

      let degradeAmount = _getDegradeAmount(char);
      if (pencil.currentDurability >= degradeAmount) {
        if (PaperHelper.readChar(paper, writeIndex) === " ") {
          paper = PaperHelper.writeChar(paper, char, writeIndex);
        } else {
          // if we need to overwrite this index, we write @
          paper = PaperHelper.writeChar(paper, "@", writeIndex);
        }
        writeIndex++;
        pencil = PencilHelper.degrade(pencil, degradeAmount);
      }
    });
    return { pencil, paper }
  }

  //write() is to append chars in the end
  write(paper: Paper, pencil: Pencil, input: string): { pencil: Pencil, paper: Paper } {
    if (pencil.currentLength === 0) return { pencil, paper };

    const inputArray = input.split('');
    let writeIndex = PaperHelper.readString(paper).length;
    inputArray.forEach(char => {
      let degradeAmount = _getDegradeAmount(char);

      if (pencil.currentDurability < degradeAmount) {
        paper = PaperHelper.writeChar(paper, " ", writeIndex);
      } else {
        paper = PaperHelper.writeChar(paper, char, writeIndex);
      }

      pencil = PencilHelper.degrade(pencil, degradeAmount);
      writeIndex++;
    });
    return { pencil, paper }
  }

  sharpen(pencil: Pencil): Pencil {
    return PencilHelper.sharpen(pencil);
  }
}
