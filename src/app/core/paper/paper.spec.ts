import Paper from './paper';

describe('Paper', () => {



    it(`should displays the user input`, () => {
        let paper: Paper = new Paper();
        paper.chars[0] = ('a');

        expect(paper.chars[0]).toBe('a');
    });

    it(`should displays the text as string`, () => {
        let paper: Paper = new Paper();
        paper.chars[0] = ('a');
        paper.chars[1] = ('b');
        expect(paper.text).toBe('ab');
    });

});
