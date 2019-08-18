import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Paper from 'src/app/core/paper/paper';
import { AppStateService } from 'src/app/core/services/app-state.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @ViewChild('textArea', { static: false }) paperView: ElementRef;

  constructor(private _appState: AppStateService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._appState.paper.subscribe((nextPaper: Paper) => {
      this.paperView.nativeElement.value = nextPaper.text;
    });
  }

  setSelectionRange(textArea) {
    this._appState.selectionStart.next(textArea.selectionStart);
    this._appState.selectionEnd.next(textArea.selectionEnd);
  }

}
