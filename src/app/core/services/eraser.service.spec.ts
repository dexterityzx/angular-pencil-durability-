import { TestBed } from '@angular/core/testing';

import { EraserService } from './eraser.service';
import Pencil from '../Pencil/pencil';
import Paper from '../paper/paper';
import { PencilService } from './pencil.service';
import Eraser from '../Eraser/eraser';

describe('EraserService', () => {
  const MAX_PENCIL_DURABILITY = 100;
  const MAX_PENCIL_LENGTH = 50;
  const MAX_ERASER_DURABILITY = 100;

  let pencilServices: PencilService;
  let eraserService: EraserService;
  let pencil: Pencil;
  let eraser: Eraser;
  let paper: Paper;

  beforeEach(() => {
    pencilServices = new PencilService();
    eraserService = new EraserService();
    pencil = new Pencil(MAX_PENCIL_DURABILITY, MAX_PENCIL_LENGTH);
    eraser = new Eraser(MAX_ERASER_DURABILITY);
    paper = new Paper();
  });

  it(`should erase a char and reduce the eraser's durability by 1`, () => {

    ({ paper } = pencilServices.write(paper, pencil, "a"));
    expect(paper.text).toBe("a");

    ({ paper, eraser } = eraserService.erase(paper, eraser, 0, 1));
    expect(paper.text).toBe(" ");
    expect(eraser.currentDurability).toBe(MAX_ERASER_DURABILITY - 1);

  });

  it(`should not erase a char if durability is 0`, () => {
    eraser = new Eraser(1);

    ({ paper } = pencilServices.write(paper, pencil, "abc"));
    expect(paper.text).toBe("abc");

    ({ paper, eraser } = eraserService.erase(paper, eraser, 0, 1));
    expect(paper.text).toBe(" bc");
    expect(eraser.currentDurability).toBe(0);

    ({ paper, eraser } = eraserService.erase(paper, eraser, 1, 2));
    expect(paper.text).toBe(" bc");
    expect(eraser.currentDurability).toBe(0);

  });

  it(`should erase a char from the back`, () => {
    eraser = new Eraser(1);

    ({ paper } = pencilServices.write(paper, pencil, "abc"));
    expect(paper.text).toBe("abc");

    ({ paper, eraser } = eraserService.erase(paper, eraser, 0, 2));
    expect(paper.text).toBe("a c");
    expect(eraser.currentDurability).toBe(0);

  });
});
