import ItemInterface from './ItemInterface'
import ManagerInterface from './ManagerInterface'
import Newable from './Newable'

export default interface ItemManagerInterface<T extends ItemInterface>
    extends ManagerInterface<T> {
    readonly type: Newable<T>
    load(manager: ItemManagerInterface<T>): void
    loadList(list: T[]): void
    make(...args: any[]): T
    toJSON(): {
        list: T[]
    }
    toOAPIArray(...args: any[]): any[]
}
