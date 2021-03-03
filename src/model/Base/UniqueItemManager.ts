import ItemManager from './ItemManager'
import UniqueItem from './UniqueItem'
import Newable from './Newable'
import KeyValue from './KeyValue'

export default class UniqueItemManager<T extends UniqueItem> extends ItemManager<T> {
    constructor(type: Newable<T>) {
        super(type)
    }

    throwIfExist(ui: string) {
        if (this.find(ui)) {
            throw new Error(`${this.type.name} ${ui} already exists!`)
        }
    }

    add(item: T) {
        this.throwIfExist(item.ui)
        super.add(item)
    }

    find(ui: string) {
        return this.list.find(item => item.ui === ui)
    }

    findOrMake(ui: string) {
        let found = this.find(ui)
        if (found === undefined) {
            found = this.make(ui)
            this.add(found)
        }
        return found
    }

    load(manager: UniqueItemManager<T>) {
        // console.log('-- load UniqueItemManager')
        manager.list.forEach(item => {
            const iii = this.make(item.ui)
            iii.load(item)
            this.add(iii)
        })
    }

    make(ui: string) {
        const item = new this.type(ui)
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
