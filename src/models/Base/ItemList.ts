import Item from './Item'
import List from './List'
import Newable from './Newable'
import ee, { EventEnum } from '../Event'

export default class ItemList<T extends Item> extends List<T> {
    readonly Type: Newable<T>

    constructor(type: Newable<T>) {
        super()
        this.Type = type
    }

    add(item: T) {
        this.list.push(item)
        ee.emit(EventEnum.AfterItemAdd, this, item)
    }

    make() {
        return new this.Type
    }

    load(manager: ItemList<T>) {
        manager.list.forEach(item => {
            const iii = this.make()
            iii.load(item)
            this.list.push(iii)
        })
    }

}