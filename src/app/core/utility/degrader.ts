export default interface Degrader<T> {
    degrade(item: T, value: number): T;
}