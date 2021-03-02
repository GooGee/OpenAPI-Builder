import Item from './Item'
import KeyValue from './KeyValue'
import Manager from './Manager'
import Newable from './Newable'

export default class ItemManager<T extends Item> extends Manager<T> {
    protected readonly type: Newable<T>

    constructor(type: Newable<T>) {
        super()
        this.type = type
    }

    load(manager: ItemManager<T>) {
        // console.log('-- load ItemManager')
        manager.list.forEach(item => {
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

    toOAPI(): KeyValue | (KeyValue | string)[] {
        return this.toOAPIArray()
    }

    toOAPIArray(): (KeyValue | string)[] {
        return this.list.map(item => item.toOAPI())
    }
}
