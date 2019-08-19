import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DisplayComponent } from './display.component';
import { MAT_IMPORT } from '../ng-material.import';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppStateService } from 'src/app/core/services/app-state.service';
import Paper from 'src/app/core/paper/paper';
import Pencil from 'src/app/core/Pencil/pencil';
import Eraser from 'src/app/core/Eraser/eraser';

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

  it('should update paper view when app state changes',
    inject([AppStateService], (appStateService: AppStateService) => {
      let paper = new Paper();
      paper.chars = ['1', '2', '3'];
      appStateService.paper.next(paper);

      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('textarea').value).toBe(paper.text);
    })
  );

  it('should update selection start when app state changes',
    inject([AppStateService], (appStateService: AppStateService) => {
      let paper = new Paper();
      paper.chars = ['1', '2', '3'];
      appStateService.paper.next(paper);

      appStateService.selectionStart.next(2);
      expect(component.selectionStart).toBe(2);
    })
  );

  it('should update selection end when app state changes',
    inject([AppStateService], (appStateService: AppStateService) => {
      let paper = new Paper();
      paper.chars = ['1', '2', '3'];
      appStateService.paper.next(paper);

      appStateService.selectionEnd.next(3);
      expect(component.selectionEnd).toBe(3);
    })
  );

  it('should update selection length when app state changes',
    inject([AppStateService], (appStateService: AppStateService) => {
      let paper = new Paper();
      paper.chars = ['1', '2', '3'];
      appStateService.paper.next(paper);

      appStateService.selectionStart.next(2);
      appStateService.selectionEnd.next(3);

      expect(component.selectionLength).toBe(1);

    })
  );

  it(`should update pencil's current durability`,
    inject([AppStateService], (appStateService: AppStateService) => {
      let pencil = new Pencil(10, 20);
      appStateService.pencil.next(pencil);

      pencil = new Pencil(10, 20);
      pencil.currentDurability = 5;
      appStateService.pencil.next(pencil);

      expect(component.pencilCurrentDurability).toBe(5);
    })
  );

  it(`should update pencil's max durability`,
    inject([AppStateService], (appStateService: AppStateService) => {
      let pencil = new Pencil(10, 20);
      appStateService.pencil.next(pencil);

      expect(component.pencilMaxDurability).toBe(10);
    })
  );

  it(`should update pencil's current length`,
    inject([AppStateService], (appStateService: AppStateService) => {
      let pencil = new Pencil(10, 20);
      appStateService.pencil.next(pencil);

      pencil = new Pencil(10, 20);
      pencil.currentLength = 10;
      appStateService.pencil.next(pencil);

      expect(component.pencilCurrentDurability).toBe(10);
    })
  );

  it(`should update pencil's max length`,
    inject([AppStateService], (appStateService: AppStateService) => {
      let pencil = new Pencil(10, 20);
      appStateService.pencil.next(pencil);

      expect(component.pencilMaxLength).toBe(20);
    })
  );

  it(`should update eraser's current durability`,
    inject([AppStateService], (appStateService: AppStateService) => {
      let eraser = new Eraser(10);
      appStateService.eraser.next(eraser);

      eraser = new Eraser(10);
      eraser.currentDurability = 5
      appStateService.eraser.next(eraser);

      expect(component.eraserCurrentDurability).toBe(5);
    })
  );

  it(`should update eraser's max durability`,
    inject([AppStateService], (appStateService: AppStateService) => {
      let eraser = new Eraser(10);
      appStateService.eraser.next(eraser);

      expect(component.eraserMaxDurability).toBe(10);
    })
  );
});
