import ItemManager from './ItemManager'
import UniqueItem from './UniqueItem'
import Newable from './Newable'
import listener from '../Event/NameChangeListener'
import KeyValue from './KeyValue'

export default class UniqueItemManager<T extends UniqueItem> extends ItemManager<T> {
    constructor(type: Newable<T>) {
        super(type)
        listener.onBeforeNameChange((sender: UniqueItem, name: string, old: string) => {
            if (this.list.includes(sender as any)) {
                this.throwIfExist(name)
            }
        })
    }

    throwIfExist(name: string) {
        if (this.find(name)) {
            throw new Error(`${this.type.name} ${name} already exists!`)
        }
    }

    add(item: T) {
        this.throwIfExist(item.name)
        super.add(item)
    }

    find(name: string) {
        return this.list.find(item => {
            return item.name === name
        })
    }

    make(...args: any[]) {
        const item = new this.type(...args)
        return item
    }

    toOAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
