export default class Eraser {

    maxDurability: number
    currentDurability: number

    constructor(maxDurability: number) {
        this.maxDurability = maxDurability
        this.currentDurability = maxDurability
    }
}