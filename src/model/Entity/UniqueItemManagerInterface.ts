import ObjectMap from './ObjectMap'
import ReferenceFinderInterface from './ReferenceFinderInterface'
import UIItemManagerInterface from './UIItemManagerInterface'
import UniqueItemInterface from './UniqueItemInterface'

export default interface UniqueItemManagerInterface<
    T extends UniqueItemInterface = UniqueItemInterface,
> extends UIItemManagerInterface<T> {
    add(item: T): void
    arrayToOAPI(list: T[], finder: ReferenceFinderInterface): ObjectMap<any>
    changeUN(item: T, un: string): void
    filter(keyword: string): UniqueItemInterface[]
    findByUN(name: string): T | undefined
    findByUNOrMakeAdd(name: string): T
    hasSame(ui: number, un: string): boolean
    hasUN(name: string): boolean
    make(name: string): T
    sort(asc?: boolean): void
    throwIfFindUN(name: string): void
    throwIfNotUnique(item: T): void
    toJSON(): {
        nextUI: number
        list: T[]
    }
    toOAPI(finder: ReferenceFinderInterface): ObjectMap<any>
    unxx: string[]
}
