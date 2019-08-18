import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/core/services/app-state.service';
import { PencilService } from 'src/app/core/services/pencil.service';
import { EraserService } from 'src/app/core/services/eraser.service';
import Paper from 'src/app/core/paper/paper';
import Pencil from 'src/app/core/Pencil/pencil';
import Eraser from 'src/app/core/Eraser/eraser';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor(
    private _appStateService: AppStateService,
    private _pencilService: PencilService,
    private _eraserService: EraserService) { }

  ngOnInit() {
  }

  write($event, writeInput) {
    let paper = this._appStateService.paper.getValue();
    let pencil = this._appStateService.pencil.getValue();
    ({ paper, pencil } = this._pencilService.write(paper, pencil, writeInput.value));
    this._appStateService.paper.next(paper);
    this._appStateService.pencil.next(pencil);
  }

  edit($event, editInput) {

    let selectionStart = this._appStateService.selectionStart.getValue();

    let paper = this._appStateService.paper.getValue();
    let pencil = this._appStateService.pencil.getValue();
    ({ paper, pencil } = this._pencilService.edit(paper, pencil, editInput.value, selectionStart));
    this._appStateService.paper.next(paper);
    this._appStateService.pencil.next(pencil);
  }

  erase() {
    let selectionStart = this._appStateService.selectionStart.getValue();
    let selectionEnd = this._appStateService.selectionEnd.getValue();
    if (selectionStart == selectionEnd) return;

    let paper = this._appStateService.paper.getValue();
    let eraser = this._appStateService.eraser.getValue();

    ({ paper, eraser } = this._eraserService.erase(paper, eraser, selectionStart, selectionEnd));

    this._appStateService.paper.next(paper);
    this._appStateService.eraser.next(eraser);
  }

  newPaper() {
    this._appStateService.paper.next(new Paper());
  }

  newPencil($event, durabilityInput, lengthInput) {
    this._appStateService.pencil.next(new Pencil(durabilityInput.value, lengthInput.value));
  }

  newEraser($event, durabilityInput) {
    this._appStateService.eraser.next(new Eraser(durabilityInput.value));
  }
}
