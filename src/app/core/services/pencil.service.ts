import { Injectable } from '@angular/core';
import PencilDegrader from '../Pencil/pencil-degrader';
import Pencil from '../Pencil/pencil';

const PENCIL_DEGRADE_AMOUNT_LOWER = 1;
const PENCIL_DEGRADE_AMOUNT_UPPER = 2;
// private properties
const _pencilDegrader: PencilDegrader = new PencilDegrader();
let _buffer: Array<string> = [];
// private function
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
    this.clear();
  }

  //edit() is to modify an existing string
  edit(pencil: Pencil, input: string, startFrom: number = 0) {
    if (pencil.currentDurability === 0) return pencil;

    const inputArray = input.split('');
    let writeIndex = Math.max(Math.min(_buffer.length, startFrom), 0);
    inputArray.forEach(char => {
      if (pencil.currentDurability === 0) return;

      let degradeAmount = _getDegradeAmount(char);
      if (pencil.currentDurability >= degradeAmount) {
        if (_buffer[writeIndex] === " ") {
          _buffer[writeIndex] = char
        } else {
          // if we need to overwrite this index, we write @
          _buffer[writeIndex] = "@"
        }
        writeIndex++;
        pencil = _pencilDegrader.degrade(pencil, degradeAmount);
      }
    });
    return pencil
  }

  //write() is to append chars in the end
  write(pencil: Pencil, input: string) {
    if (pencil.currentLength === 0) return pencil;

    const inputArray = input.split('');
    let writeIndex = _buffer.length;
    inputArray.forEach(char => {
      let degradeAmount = _getDegradeAmount(char);

      if (pencil.currentDurability < degradeAmount) {
        _buffer[writeIndex] = " ";
      } else {
        _buffer[writeIndex] = char
      }

      pencil = _pencilDegrader.degrade(pencil, degradeAmount);
      writeIndex++;
    });
    return pencil
  }

  //transfer from buffer to 
  output() {
    return _buffer.join('');
  }

  clear() {
    _buffer = [];
  }

}
