import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DisplayComponent } from './display.component';
import { MAT_IMPORT } from '../ng-material.import';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppStateService } from 'src/app/core/services/app-state.service';
import Paper from 'src/app/core/paper/paper';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayComponent],
      imports: [
        BrowserAnimationsModule,
        ...MAT_IMPORT
      ],
      providers: [AppStateService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selection when app state changes', () => {
    inject([AppStateService], (appStateService: AppStateService) => {
      let paper = new Paper();
      paper.chars = ['1', '2', '3'];
      appStateService.paper.next(paper);

      appStateService.selectionStart.next(2);
      appStateService.selectionEnd.next(3);

      expect(component.selectionStart).toBe(2);
      expect(component.selectionStart).toBe(3);
      expect(component.selectionLength).toBe(3 - 2);
      expect(component.selectedText).toBe('23');
    })

  })
});
