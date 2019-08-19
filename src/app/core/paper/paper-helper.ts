import Paper from './paper';

export default class PaperHelper {
    static writeChar(paper: Paper, charToWrite: string, indexToWrite: number) {

        charToWrite = charToWrite.length > 1 ? charToWrite[0] : charToWrite;

        let nextPaper = Object.assign(new Paper(), paper);
        nextPaper.chars[indexToWrite] = charToWrite;
        return nextPaper;
    }

    static writeString(paper: Paper, strToWrite: string, indexStartToWrite: number) {

        let nextPaper = Object.assign(new Paper(), paper);
        nextPaper.chars.splice.apply(nextPaper.chars, [indexStartToWrite, strToWrite.length, ...strToWrite.split('')]);
        return nextPaper;
    }

    static readChar(paper: Paper, indexToRead: number) {

        return paper.chars[indexToRead];
    }

    static readAllChars(paper: Paper) {

        return paper.chars;
    }

    static readString(paper: Paper) {

        return paper.chars.join('');
    }

    static create() {
        return new Paper();
    }
}