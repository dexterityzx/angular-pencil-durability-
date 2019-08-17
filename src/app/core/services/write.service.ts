import { Injectable } from '@angular/core';
import PencilDegrader from '../Pencil/pencil-degrader';
import Pencil from '../Pencil/pencil';

const PENCIL_DEGRADE_AMOUNT_LOWER = 1;
const PENCIL_DEGRADE_AMOUNT_UPPER = 2;

@Injectable({
  providedIn: 'root'
})
export class WriteService {

  chars: Array<string> = [];
  pencilDegrader: PencilDegrader = new PencilDegrader();

  constructor() { }



  write(pencil: Pencil, input: string, startFrom: number = 0) {
    let inputChars = input.split('');

    startFrom = Math.max(Math.min(this.chars.length, startFrom), 0);

    for (let i = startFrom, j = 0; i < startFrom + input.length; i++ , j++) {
      this.chars[i] = inputChars[j];
      if (inputChars[j] === inputChars[j].toLowerCase()) {
        pencil = this.pencilDegrader.degrade(pencil, PENCIL_DEGRADE_AMOUNT_LOWER);
      } else if (inputChars[j] === inputChars[j].toUpperCase()) {
        pencil = this.pencilDegrader.degrade(pencil, PENCIL_DEGRADE_AMOUNT_UPPER);
      }
    }

    return pencil
  }

  output() {
    return this.chars.join('');
  }

}
