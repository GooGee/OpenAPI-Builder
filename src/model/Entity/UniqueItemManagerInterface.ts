import ObjectMap from './ObjectMap'
import ReferenceFinderInterface from './ReferenceFinderInterface'
import UIItemManagerInterface from './UIItemManagerInterface'
import UniqueItemInterface from './UniqueItemInterface'

export default interface UniqueItemManagerInterface<
    T extends UniqueItemInterface = UniqueItemInterface,
> extends UIItemManagerInterface<T> {
    readonly unique: boolean
    add(item: T): void
    arrayToOAPI(list: T[], finder: ReferenceFinderInterface): ObjectMap<any>
    filter(keyword: string): UniqueItemInterface[]
    findByUN(name: string): T | undefined
    findOrMake(name: string): T
    hasSame(ui: number, un: string): boolean
    hasUN(name: string): boolean
    load(manager: UniqueItemManagerInterface<T>): void
    make(name: string): T
    sort(asc?: boolean): void
    throwIfFindUN(name: string): void
    toJSON(): {
        nextUI: number
        list: T[]
    }
    toOAPI(finder: ReferenceFinderInterface): ObjectMap<any>
    toUNArray(): string[]
}
