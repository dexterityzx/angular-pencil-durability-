import Paper from './paper';

export default class PaperHelper {
    // write a char at an index
    static writeChar(paper: Paper, charToWrite: string, indexToWrite: number) {

        charToWrite = charToWrite.length > 1 ? charToWrite[0] : charToWrite;

        let nextPaper = Object.assign(new Paper(), paper);
        nextPaper.chars[indexToWrite] = charToWrite;
        return nextPaper;
    }

    // write a string from an index
    static writeString(paper: Paper, strToWrite: string, indexStartToWrite: number) {

        let nextPaper = Object.assign(new Paper(), paper);
        nextPaper.chars.splice.apply(nextPaper.chars, [indexStartToWrite, strToWrite.length, ...strToWrite.split('')]);
        return nextPaper;
    }

    // read a char at an index
    static readChar(paper: Paper, indexToRead: number) {

        return paper.chars[indexToRead];
    }

    // return an array of all chars.
    static readAllChars(paper: Paper) {

        return paper.chars;
    }

    // join the char and return a string
    static readString(paper: Paper) {

        return paper.chars.join('');
    }

    //return a new paper
    static create() {
        return new Paper();
    }
}