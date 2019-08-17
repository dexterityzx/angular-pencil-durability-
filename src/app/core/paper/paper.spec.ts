import Paper from './paper';

describe('Paper', () => {



    it(`should displays the user input`, () => {
        let paper: Paper = new Paper();
        paper.chars[0] = ('abc');

        expect(paper.chars[0]).toBe('abc');
    });

    it(`should displays the text as string`, () => {
        let paper: Paper = new Paper();
        paper.chars[0] = ('abc');
        paper.chars[1] = (',def');
        expect(paper.text).toBe('abc,def');
    });

});
