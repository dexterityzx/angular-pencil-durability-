import { Injectable } from '@angular/core';
import Paper from '../paper/paper';
import Pencil from '../pencil/pencil';
import Eraser from '../eraser/eraser';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  paper: BehaviorSubject<Paper>;
  pencil: BehaviorSubject<Pencil>;
  eraser: BehaviorSubject<Eraser>;

  selectionStart: BehaviorSubject<number>;
  selectionEnd: BehaviorSubject<number>;

  constructor() {
    this.paper = new BehaviorSubject<Paper>(new Paper());
    this.pencil = new BehaviorSubject<Pencil>(new Pencil(100, 100));
    this.eraser = new BehaviorSubject<Eraser>(new Eraser(100));
    this.selectionStart = new BehaviorSubject<number>(0);
    this.selectionEnd = new BehaviorSubject<number>(0);
  }

}
