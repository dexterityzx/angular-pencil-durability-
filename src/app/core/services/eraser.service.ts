import { Injectable } from '@angular/core';
import Paper from '../paper/paper';
import Eraser from '../eraser/eraser';
import PaperHelper from '../paper/paper-helper';
import EraserHelper from '../eraser/eraser-helper';
/***** private *****/
// constants
const ERASER_DEGRADE_AMOUNT = 1;
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

  return ERASER_DEGRADE_AMOUNT;

};
@Injectable({
  providedIn: 'root'
})
export class EraserService {

  constructor() { }
  // this will erase a range of the words on paper with an eraser, and return a new state of eraser and paper.
  erase(paper: Paper, eraser: Eraser, from: number, to: number): { eraser: Eraser, paper: Paper } {
    if (eraser.currentDurability === 0) return { eraser, paper };

    from = Math.max(Math.min(PaperHelper.readString(paper).length, from), 0);
    to = Math.max(Math.min(PaperHelper.readString(paper).length, to), 0);

    for (let i = to - 1; i >= from; i--) {
      let charToErase = PaperHelper.readChar(paper, i)
      let degradeAmount = _getDegradeAmount(charToErase);
      if (eraser.currentDurability >= degradeAmount) {
        paper = PaperHelper.writeChar(paper, " ", i);
      }
      eraser = EraserHelper.degrade(eraser, degradeAmount);
    }

    return { eraser, paper };
  }
}
