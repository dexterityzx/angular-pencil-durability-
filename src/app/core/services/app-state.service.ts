import { Injectable } from '@angular/core';
import { APP_MODE } from '../constants';
import Paper from '../paper/paper';
import Pencil from '../Pencil/pencil';
import Eraser from '../Eraser/eraser';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  paper: Subject<Paper>;
  pencil: Subject<Pencil>;
  eraser: Subject<Eraser>;

  constructor() {
  }

}
