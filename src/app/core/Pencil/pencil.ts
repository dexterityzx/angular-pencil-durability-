export default class Pencil {

    maxDurability: number;
    maxLength: number;
    currentDurability: number;
    currentLength: number;

    constructor(maxDurability: number, maxLength: number) {
        this.maxDurability = maxDurability
        this.maxLength = maxLength
        this.currentLength = maxLength
        this.currentDurability = maxDurability
    }
}