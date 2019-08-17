export default class Paper {

    chars: Array<string>;

    constructor() {
        this.chars = []
    }

    get text() {
        return this.chars.join('');
    }
}