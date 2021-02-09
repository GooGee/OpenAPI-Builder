import Item from './Item'
import Manager from './Manager'
import Newable from './Newable'

export default class ItemManager<T extends Item> extends Manager<T> {
    readonly type: Newable<T>

    constructor(type: Newable<T>) {
        super()
        this.type = type
    }

    make() {
        return new this.type()
    }
}
