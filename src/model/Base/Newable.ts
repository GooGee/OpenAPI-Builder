export default interface Newable<T> {
    new (...args: any[]): T
}
