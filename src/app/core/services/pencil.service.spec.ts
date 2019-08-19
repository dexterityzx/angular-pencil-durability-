import { PencilService } from './pencil.service';
import Pencil from '../pencil/pencil';
import Paper from '../paper/paper';
import PencilHelper from '../pencil/pencil-helper';

describe('PencilService', () => {
  const MAX_DURABILITY = 100;
  const MAX_LENGTH = 50;

  let _pencilService: PencilService;
  let _pencilHelper: PencilHelper;
  let pencil: Pencil;
  let paper: Paper;

  beforeAll(() => {
    _pencilHelper = new PencilHelper();
  });

  beforeEach(() => {
    _pencilService = new PencilService();
    pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
    paper = new Paper();
  });

  it(`should write a lower case word and reduce the pen's durability by 1`, () => {

    ({ paper, pencil } = _pencilService.write(paper, pencil, "a"));

    expect(paper.text).toBe("a");

    expect(pencil.currentDurability).toBe(MAX_DURABILITY - 1);


  });

  it(`should write a upper case word and reduce the pen's durability by 2`, () => {
    ({ pencil } = _pencilService.write(paper, pencil, "A"));

    expect(paper.text).toBe("A");

    expect(pencil.currentDurability).toBe(MAX_DURABILITY - 2);
  });

  it(`should not write with a pen of 0 length`, () => {
    pencil = new Pencil(1, 1);
    ({ pencil } = _pencilService.write(paper, pencil, "a"));
    pencil = _pencilHelper.sharpen(pencil, 1);

    expect(paper.text).toBe("a");
    expect(pencil.currentLength).toBe(0);
    expect(pencil.currentDurability).toBe(0);

    ({ pencil, paper } = _pencilService.write(paper, pencil, "a"));
    expect(paper.text).toBe("a");

    ({ pencil, paper } = _pencilService.write(paper, pencil, "b"));
    expect(paper.text).toBe("a");

  });


  it(`writes "aa" with a pen of 1 durability`, () => {
    pencil = new Pencil(1, MAX_LENGTH);
    ({ pencil, paper } = _pencilService.write(paper, pencil, "aa"));
    expect(paper.text).toBe("a ");
  });

  it(`writes "A" with a pen of 1 durability`, () => {
    pencil = new Pencil(1, MAX_LENGTH);
    ({ pencil, paper } = _pencilService.write(paper, pencil, "A"));
    expect(paper.text).toBe(" ");
  });

  it(`writes "Aa" with a pen of 1 durability`, () => {
    pencil = new Pencil(1, MAX_LENGTH);
    ({ pencil, paper } = _pencilService.write(paper, pencil, "Aa"));
    expect(paper.text).toBe("  ");
  });

  it(`writes "aA" with a pen of 1 durability`, () => {
    pencil = new Pencil(1, MAX_LENGTH);
    ({ pencil, paper } = _pencilService.write(paper, pencil, "aA"));
    expect(paper.text).toBe("a ");
  });

  it(`writes " " with no point degration`, () => {
    pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
    ({ pencil } = _pencilService.write(paper, pencil, " "));
    expect(pencil.currentDurability).toBe(MAX_DURABILITY);
  });

  it(`writes "\n" with no point degration`, () => {
    pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
    ({ pencil } = _pencilService.write(paper, pencil, "\n"));
    expect(pencil.currentDurability).toBe(MAX_DURABILITY);
  });

  it(`overwrites the same char with "@"`, () => {
    pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
    ({ pencil, paper } = _pencilService.write(paper, pencil, "An       a day keeps the doctor away"));
    ({ pencil, paper } = _pencilService.edit(paper, pencil, "artichoke", 3));
    expect(paper.text).toBe("An artich@k@ay keeps the doctor away");
  });

  it(`can sharpen a pencil`, () => {
    let testString = "133"
    pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
    ({ pencil } = _pencilService.write(paper, pencil, testString));
    expect(pencil.currentDurability).toBe(pencil.maxDurability - testString.length);

    pencil = _pencilService.sharpen(pencil);
    expect(pencil.currentDurability).toBe(pencil.maxDurability);

  });

});
