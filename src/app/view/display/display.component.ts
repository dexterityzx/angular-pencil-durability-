import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Paper from 'src/app/core/paper/paper';
import { AppStateService } from 'src/app/core/services/app-state.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @ViewChild('paperTextarea', { static: false }) paperView: ElementRef;
  selectionStart: number;
  selectionEnd: number;
  selectionLength: number;
  selectedText: string;

  pencilCurrentDurability: number;
  pencilMaxDurability: number;
  pencilCurrentLength: number;
  pencilMaxLength: number;

  eraserCurrentDurability: number;
  eraserMaxDurability: number;

  constructor(private _appStateService: AppStateService) { }

  ngOnInit() {
    this.selectedText = "";

    this._appStateService.selectionStart.subscribe(value => {
      this.selectionStart = value;
      this.udpateSelectionLength();
    });
    this._appStateService.selectionEnd.subscribe(value => {
      this.selectionEnd = value;
      this.udpateSelectionLength();
    });
    this._appStateService.pencil.subscribe(pencil => {
      this.pencilCurrentDurability = pencil.currentDurability;
      this.pencilCurrentLength = pencil.currentLength;
      this.pencilMaxDurability = pencil.maxDurability;
      this.pencilMaxLength = pencil.maxLength;
    });
    this._appStateService.eraser.subscribe(eraser => {
      this.eraserCurrentDurability = eraser.currentDurability;
      this.eraserMaxDurability = eraser.maxDurability;
    })
  }

  ngAfterViewInit() {

    this._appStateService.paper.subscribe((nextPaper: Paper) => {
      this.paperView.nativeElement.value = nextPaper.text;
      this.udpateSelectedText(this.paperView.nativeElement);
    });

  }

  setSelectionRange(textArea) {
    this._appStateService.selectionStart.next(textArea.selectionStart);
    this._appStateService.selectionEnd.next(textArea.selectionEnd);
    this.udpateSelectedText(textArea);
  }

  udpateSelectedText(textArea) {
    this.selectedText = textArea.value.slice(this.selectionStart, this.selectionEnd);
  }

  udpateSelectionLength() {
    this.selectionLength = Math.max(this.selectionEnd - this.selectionStart, 0);
  }


}
