import ItemInterface from './ItemInterface'
import ItemManagerInterface from './ItemManagerInterface'
import Manager from './Manager'
import Newable from './Newable'

export default class ItemManager<T extends ItemInterface>
    extends Manager<T>
    implements ItemManagerInterface<T>
{
    protected readonly type: Newable<T>

    constructor(type: Newable<T>) {
        super()
        this.type = type
    }

    load(manager: ItemManagerInterface<T>) {
        this.loadList(manager.list)
    }

    loadList(list: T[]) {
        // console.log('-- load ItemManager')
        list.forEach((item) => this.loadItem(item))
    }

    protected loadItem(item: T) {
        const iii = this.make()
        iii.load(item)
        this.list.push(iii)
    }

    make(...args: any[]) {
        return new this.type(...args)
    }

    toJSON() {
        return {
            list: this.list,
        }
    }

    toOAPIArray(...args: any[]): any[] {
        return this.list.map((item) => item.toOAPI())
    }
}
