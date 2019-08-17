import { PencilService } from './pencil.service';
import Pencil from '../Pencil/pencil';
import PencilSharpener from '../Pencil/pencil-sharpener';

describe('PencilService', () => {
  const MAX_DURABILITY = 100;
  const MAX_LENGTH = 50;

  let _pencilServices: PencilService;
  let _pencilSharpener: PencilSharpener;
  let _pencil: Pencil;

  beforeAll(() => {
    _pencilSharpener = new PencilSharpener();
  });

  beforeEach(() => {
    _pencilServices = new PencilService();
    _pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
  });

  it(`should write a lower case word and reduce the pen's durability by 1`, () => {

    _pencil = _pencilServices.write(_pencil, "a");

    expect(_pencilServices.output()).toBe("a");

    expect(_pencil.currentDurability).toBe(MAX_DURABILITY - 1);


  });

  it(`should write a upper case word and reduce the pen's durability by 2`, () => {
    _pencil = _pencilServices.write(_pencil, "A");

    expect(_pencilServices.output()).toBe("A");

    expect(_pencil.currentDurability).toBe(MAX_DURABILITY - 2);
  });

  it(`should not write with a pen of 0 length`, () => {
    _pencil = new Pencil(1, 1);
    _pencil = _pencilServices.write(_pencil, "a");
    _pencil = _pencilSharpener.sharpen(_pencil, 1);

    expect(_pencilServices.output()).toBe("a");
    expect(_pencil.currentLength).toBe(0);
    expect(_pencil.currentDurability).toBe(0);

    _pencil = _pencilServices.write(_pencil, "a");
    expect(_pencilServices.output()).toBe("a");

    _pencil = _pencilServices.write(_pencil, "b");
    expect(_pencilServices.output()).toBe("a");

  });


  it(`writes "aa" with a pen of 1 durability`, () => {
    _pencil = new Pencil(1, MAX_LENGTH);
    _pencil = _pencilServices.write(_pencil, "aa");
    expect(_pencilServices.output()).toBe("a ");
  });

  it(`writes "A" with a pen of 1 durability`, () => {
    _pencil = new Pencil(1, MAX_LENGTH);
    _pencil = _pencilServices.write(_pencil, "A");
    expect(_pencilServices.output()).toBe(" ");
  });

  it(`writes "Aa" with a pen of 1 durability`, () => {
    _pencil = new Pencil(1, MAX_LENGTH);
    _pencil = _pencilServices.write(_pencil, "Aa");
    expect(_pencilServices.output()).toBe("  ");
  });

  it(`writes "aA" with a pen of 1 durability`, () => {
    _pencil = new Pencil(1, MAX_LENGTH);
    _pencil = _pencilServices.write(_pencil, "aA");
    expect(_pencilServices.output()).toBe("a ");
  });

  it(`writes " " with no point degration`, () => {
    _pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
    _pencil = _pencilServices.write(_pencil, " ");
    expect(_pencil.currentDurability).toBe(MAX_DURABILITY);
  });

  it(`writes "\n" with no point degration`, () => {
    _pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
    _pencil = _pencilServices.write(_pencil, "\n");
    expect(_pencil.currentDurability).toBe(MAX_DURABILITY);
  });

  it(`overwrites the same char with "@"`, () => {
    _pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
    _pencil = _pencilServices.write(_pencil, "An       a day keeps the doctor away");
    _pencil = _pencilServices.edit(_pencil, "artichoke", 3);
    expect(_pencilServices.output()).toBe("An artich@k@ay keeps the doctor away");
  });

});
