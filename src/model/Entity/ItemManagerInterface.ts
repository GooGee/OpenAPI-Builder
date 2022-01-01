import ItemInterface from './ItemInterface'
import ManagerInterface from './ManagerInterface'

export default interface ItemManagerInterface<T extends ItemInterface>
    extends ManagerInterface<T> {
    load(manager: this): void
    loadList(list: T[]): void
    make(...args: any[]): T
    toJSON(): {
        list: T[]
    }
    toOAPIArray(...args: any[]): any[]
}
