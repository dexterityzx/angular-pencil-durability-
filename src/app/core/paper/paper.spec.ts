import Paper from './paper';

describe('Paper', () => {



    it(`should displays the user input`, () => {
        let paper: Paper = new Paper();
        paper.chars[0] = ('abc');

        expect(paper.chars[0]).toBe('abc');


    });

});
