import { Component, OnInit, ElementRef } from '@angular/core';
import { AppStateService } from 'src/app/core/services/app-state.service';
import { PencilService } from 'src/app/core/services/pencil.service';
import { EraserService } from 'src/app/core/services/eraser.service';
import Paper from 'src/app/core/paper/paper';
import PencilHelper from 'src/app/core/pencil/pencil-helper';
import EraserHelper from 'src/app/core/eraser/eraser-helper';
import PaperHelper from 'src/app/core/paper/paper-helper';

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

  write($event, writeInput: { value: string }) {

    let paper = this._appStateService.paper.getValue();
    let pencil = this._appStateService.pencil.getValue();
    ({ paper, pencil } = this._pencilService.write(paper, pencil, writeInput.value));
    this._appStateService.paper.next(paper);
    this._appStateService.pencil.next(pencil);
    //clear input
    writeInput.value = "";
  }

  edit($event, editInput: { value: string }) {

    let selectionStart = this._appStateService.selectionStart.getValue();

    let paper = this._appStateService.paper.getValue();
    let pencil = this._appStateService.pencil.getValue();
    ({ paper, pencil } = this._pencilService.edit(paper, pencil, editInput.value, selectionStart));
    this._appStateService.paper.next(paper);
    this._appStateService.pencil.next(pencil);
    //clear input
    editInput.value = "";
  }

  erase($event) {
    let selectionStart = this._appStateService.selectionStart.getValue();
    let selectionEnd = this._appStateService.selectionEnd.getValue();


    let paper = this._appStateService.paper.getValue();
    let eraser = this._appStateService.eraser.getValue();

    if (selectionStart == selectionEnd) {
      ({ paper, eraser } = this._eraserService.erase(paper, eraser, selectionEnd - 1, selectionEnd));
      this._appStateService.selectionStart.next(Math.max(selectionEnd - 1, 0));
      this._appStateService.selectionEnd.next(Math.max(selectionEnd - 1, 0));
    }
    else {
      ({ paper, eraser } = this._eraserService.erase(paper, eraser, selectionStart, selectionEnd));
    }

    this._appStateService.paper.next(paper);
    this._appStateService.eraser.next(eraser);
  }

  sharpen($event) {
    this._appStateService.pencil.next(this._pencilService.sharpen(this._appStateService.pencil.getValue()));
  }

  newPaper($event) {
    this._appStateService.paper.next(PaperHelper.create());
  }

  newPencil($event, durabilityInput: { value: number }, lengthInput: { value: number }) {
    this._appStateService.pencil.next(PencilHelper.create(durabilityInput.value, lengthInput.value));
  }

  newEraser($event, durabilityInput: { value: number }) {
    this._appStateService.eraser.next(EraserHelper.create(durabilityInput.value));
  }
}
