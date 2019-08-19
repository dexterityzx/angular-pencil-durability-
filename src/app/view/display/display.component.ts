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

  constructor(private _appState: AppStateService) { }

  ngOnInit() {
    this.selectionStart = 0;
    this.selectionEnd = 0;
    this.selectionLength = this.selectionEnd - this.selectionStart;
    this.selectedText = "";
  }

  ngAfterViewInit() {

    this._appState.paper.subscribe((nextPaper: Paper) => {
      this.paperView.nativeElement.value = nextPaper.text;
      this.udpateSelectedText(this.paperView.nativeElement);

    });
    this._appState.selectionStart.subscribe(value => {
      this.selectionStart = value;
      this.udpateSelectionLength();
    });
    this._appState.selectionEnd.subscribe(value => {
      this.selectionEnd = value;
      this.udpateSelectionLength();
    });
  }

  setSelectionRange(textArea) {
    this._appState.selectionStart.next(textArea.selectionStart);
    this._appState.selectionEnd.next(textArea.selectionEnd);
    this.udpateSelectedText(textArea);
  }

  udpateSelectedText(textArea) {
    this.selectedText = textArea.value.slice(this.selectionStart, this.selectionEnd);
  }

  udpateSelectionLength() {
    this.selectionLength = Math.max(this.selectionEnd - this.selectionStart, 0);
  }


}
