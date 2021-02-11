import ItemManager from './ItemManager'
import UniqueItem from './UniqueItem'
import Newable from './Newable'
import listener from '../Event/NameChangeListener'
import KeyValue from './KeyValue'

export default class UniqueItemManager<T extends UniqueItem> extends ItemManager<T> {
    constructor(type: Newable<T>) {
        super(type)
        listener.onBeforeUIChange((sender: UniqueItem, name: string, old: string) => {
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
        this.throwIfExist(item.ui)
        super.add(item)
    }

    find(name: string) {
        return this.list.find(item => {
            return item.ui === name
        })
    }

    load(manager: UniqueItemManager<T>) {
        // console.log('-- load UniqueItemManager')
        manager.list.forEach(item => {
            const iii = this.make(item.ui)
            iii.load(item)
            this.add(iii)
        })
    }

    make(...args: any[]) {
        const item = new this.type(...args)
        return item
    }

    toOAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.ui] = item.toOAPI()
        })
        return map
    }
}
