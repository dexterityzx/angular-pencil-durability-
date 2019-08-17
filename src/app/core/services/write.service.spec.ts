import { TestBed } from '@angular/core/testing';

import { WriteService } from './write.service';
import Pencil from '../Pencil/pencil';

describe('WriteService', () => {
  const MAX_DURABILITY = 100;
  const MAX_LENGTH = 50;
  const TEST_STRING_MIXED = "This is a test."

  const _writeService: WriteService = new WriteService();
  let _pencil: Pencil;

  beforeAll(() => {

  });

  beforeEach(() => {
    _pencil = new Pencil(MAX_DURABILITY, MAX_LENGTH);
  });

  it(`should write a lower case word and reduce the pen's durability by 1`, () => {

    _pencil = _writeService.write(_pencil, "a");

    expect(_writeService.output()).toBe("a");

    expect(_pencil.currentDurability).toBe(MAX_DURABILITY - 1);


  });

  it(`should write a upper case word and reduce the pen's durability by 2`, () => {
    _pencil = _writeService.write(_pencil, "A");

    expect(_writeService.output()).toBe("A");

    expect(_pencil.currentDurability).toBe(MAX_DURABILITY - 2);
  });


  it('should not write words with a pen of 0 durability', () => {

  });

  it('should not write words with a pen of 0 length', () => {

  });

});
