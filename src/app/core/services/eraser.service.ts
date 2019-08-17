import { Injectable } from '@angular/core';
import Paper from '../paper/paper';
import Eraser from '../Eraser/eraser';
import EraserDegrader from '../Eraser/eraser-degrader';
import PaperHelper from '../paper/paper-helper';
/***** private *****/
// constants
const ERASER_DEGRADE_AMOUNT = 1;
// properties
const _eraserDegrader: EraserDegrader = new EraserDegrader();
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
      eraser = _eraserDegrader.degrade(eraser, degradeAmount);
    }

    return { eraser, paper };
  }
}
