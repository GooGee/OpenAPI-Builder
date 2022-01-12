import ItemManagerInterface from './ItemManagerInterface'
import UIItemInterface from './UIItemInterface'

export default interface UIItemManagerInterface<
    T extends UIItemInterface = UIItemInterface,
> extends ItemManagerInterface<T> {
    nextUI: number
    add(item: T): void
    find(ui: number): T | undefined
    findAll(uixx: number[]): T[]
    findOrMakeAdd(ui: number): T
    has(ui: number): boolean
    load(manager: this): void
    throwIfFind(ui: number): void
    uixx: number[]
}
