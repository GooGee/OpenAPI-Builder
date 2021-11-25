import Item from './Item'
import Manager from './Manager'
import Newable from './Newable'

export default class ItemManager<T extends Item> extends Manager<T> {
    protected readonly type: Newable<T>

    constructor(type: Newable<T>) {
        super()
        this.type = type
    }

    load(manager: ItemManager<T>) {
        this.loadList(manager.list)
    }

    loadList(list: T[]) {
        // console.log('-- load ItemManager')
        list.forEach(item => {
            const iii = this.make()
            iii.load(item)
            this.list.push(iii)
        })
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
        return this.list.map(item => item.toOAPI())
    }
}
