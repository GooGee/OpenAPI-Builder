export default interface ManagerInterface<T> {
    readonly list: Array<T>
    add(item: T): void
    remove(item: T): void
    clear(): void
    moveUp(item: T): void
    moveDown(item: T): void
    swap(left: number, right: number): void
}
