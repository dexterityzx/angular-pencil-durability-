import Paper from './paper';
import PaperHelper from './paper-helper';

describe('Paper Helper', () => {

    it(`can create a paper`, () => {

        let paper = PaperHelper.create();
        expect(paper instanceof Paper).toBeTruthy();

    });

    it(`can write a char on a paper and return a paper`, () => {
        let paper: Paper = new Paper();

        paper = PaperHelper.writeChar(paper, 'a', 0)
        expect(paper.chars[0]).toBe('a');
        expect(paper instanceof Paper).toBeTruthy();

        paper = PaperHelper.writeChar(paper, 'b', 1)
        expect(paper.chars[1]).toBe('b');
        expect(paper instanceof Paper).toBeTruthy();

        paper = PaperHelper.writeChar(paper, 'cdefg', 2)
        expect(paper.chars[2]).toBe('c');
        expect(paper instanceof Paper).toBeTruthy();

        expect(paper.text).toBe('abc');
    });

    it(`can write a string on a paper and return a paper`, () => {
        let paper: Paper = new Paper();

        paper = PaperHelper.writeChar(paper, 'a', 0)
        expect(paper.chars[0]).toBe('a');
        expect(paper instanceof Paper).toBeTruthy();

        paper = PaperHelper.writeChar(paper, 'b', 1)
        expect(paper.chars[1]).toBe('b');
        expect(paper instanceof Paper).toBeTruthy();

        paper = PaperHelper.writeChar(paper, 'c', 2)
        expect(paper.chars[2]).toBe('c');
        expect(paper instanceof Paper).toBeTruthy();


        paper = PaperHelper.writeString(paper, 'de', 1)
        expect(paper.text).toBe('ade');
        expect(paper instanceof Paper).toBeTruthy();


    });

    it(`can read a char on a paper and return the char value`, () => {

        let paper: Paper = new Paper();
        paper = PaperHelper.writeString(paper, 'abc', 0);

        expect(PaperHelper.readChar(paper, 0)).toBe('a');

        expect(PaperHelper.readChar(paper, 1)).toBe('b');

        expect(PaperHelper.readChar(paper, 2)).toBe('c');

    });

});
