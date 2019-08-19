import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ActionComponent } from './action.component';
import { MAT_IMPORT } from '../ng-material.import';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppStateService } from 'src/app/core/services/app-state.service';

describe('ActionComponent', () => {
  let component: ActionComponent;
  let fixture: ComponentFixture<ActionComponent>;
  let testInput: { value: string };
  let testDurabilityInput: { value: number };
  let testLengthInput: { value: number };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionComponent],
      imports: [
        BrowserAnimationsModule,
        ...MAT_IMPORT
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testInput = { value: 'hello' };
    testDurabilityInput = { value: 100 };
    testLengthInput = { value: 50 };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write to the paper',
    inject([AppStateService], (appStateService: AppStateService) => {
      // we save the value because the input will be clear after writing the paper
      let value = testInput.value;

      component.write(null, testInput);

      expect(appStateService.paper.getValue().text).toBe(value);
    })
  );

  it('should edit the word on the paper',
    inject([AppStateService], (appStateService: AppStateService) => {
      // we save the value because the input will be clear after writing the paper
      component.write(null, testInput);

      appStateService.selectionStart.next(2);

      let testEditInput = { value: "hi" }
      component.edit(null, testEditInput);

      expect(appStateService.paper.getValue().text).toBe('he@@o');
    })
  );

  it(`should reduce the pencil's durability after writing`,
    inject([AppStateService], (appStateService: AppStateService) => {
      component.write(null, testInput);
      expect(appStateService.pencil.getValue().currentDurability)
        .toBeLessThan(appStateService.pencil.getValue().maxDurability)
    })
  );

  it('should erase the words from the paper', inject([AppStateService], (appStateService: AppStateService) => {
    component.write(null, testInput);

    appStateService.selectionStart.next(2);
    appStateService.selectionEnd.next(3);

    component.erase(null);
    expect(appStateService.paper.getValue().text).toBe('he lo')
  })
  );

  it(`should reduce the eraser's durability after erasing`,
    inject([AppStateService], (appStateService: AppStateService) => {
      component.write(null, testInput);

      appStateService.selectionStart.next(2);
      appStateService.selectionEnd.next(3);

      component.erase(null);
      expect(appStateService.eraser.getValue().currentDurability).toBeLessThan(appStateService.eraser.getValue().maxDurability)
    })
  );

  it('should create a new paper',
    inject([AppStateService], (appStateService: AppStateService) => {
      component.write(null, testInput);

      component.newPaper(null)
      expect(appStateService.paper.getValue().text).toBe('');
    })
  );

  it('can create a new pencil with a max durability',
    inject([AppStateService], (appStateService: AppStateService) => {
      component.write(null, testInput);

      component.newPencil(null, testDurabilityInput, testLengthInput)
      expect(appStateService.pencil.getValue().maxDurability).toBe(testDurabilityInput.value);
    })
  );

  it('can create a new pencil with a max length',
    inject([AppStateService], (appStateService: AppStateService) => {
      component.write(null, testInput);

      component.newPencil(null, testDurabilityInput, testLengthInput)
      expect(appStateService.pencil.getValue().maxLength).toBe(testLengthInput.value);
    })
  );

  it('can create a new pencil with current durability equals to max durability',
    inject([AppStateService], (appStateService: AppStateService) => {
      component.write(null, testInput);

      component.newPencil(null, testDurabilityInput, testLengthInput)
      expect(appStateService.pencil.getValue().currentDurability).toBe(testDurabilityInput.value);
    })
  );

  it('can create a new pencil with current length equals to max length',
    inject([AppStateService], (appStateService: AppStateService) => {
      component.write(null, testInput);

      component.newPencil(null, testDurabilityInput, testLengthInput);
      expect(appStateService.pencil.getValue().currentLength).toBe(testLengthInput.value);
    })
  );

  it('can create a new eraser with a max durability',
    inject([AppStateService], (appStateService: AppStateService) => {
      component.write(null, testInput);

      appStateService.selectionStart.next(2);
      appStateService.selectionEnd.next(3);

      component.erase(null);

      component.newEraser(null, testDurabilityInput)
      expect(appStateService.eraser.getValue().maxDurability).toBe(testDurabilityInput.value);
    })
  );

  it('can create a new eraser with current durability euqals to max durability',
    inject([AppStateService], (appStateService: AppStateService) => {
      component.write(null, testInput);

      appStateService.selectionStart.next(2);
      appStateService.selectionEnd.next(3);

      component.erase(null);

      component.newEraser(null, testDurabilityInput)
      expect(appStateService.eraser.getValue().currentDurability).toBe(testDurabilityInput.value);
    })
  );

  it(`can sharpen a pencil and make the pencil's current durability euqal to max durability`,
    inject([AppStateService], (appStateService: AppStateService) => {
      component.write(null, testInput);
      component.sharpen(null);
      expect(appStateService.pencil.getValue().currentDurability).toBe(appStateService.pencil.getValue().maxDurability);
    })
  );
});
