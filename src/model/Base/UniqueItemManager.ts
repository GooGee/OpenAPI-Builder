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

    loadList(list: T[]) {
        // console.log('-- load UniqueItemManager')
        list.forEach(item => {
            const iii = this.make(item.ui)
            iii.load(item)
            this.list.push(iii)
        })
    }

    make(ui: string) {
        const item = new this.type(ui)
        return item
    }

    sort(asc = true) {
        if (asc) {
            this.list.sort((aaa, bbb) => aaa.ui.localeCompare(bbb.ui))
        } else {
            this.list.sort((aaa, bbb) => bbb.ui.localeCompare(aaa.ui))
        }
    }

    toOAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.ui] = item.toOAPI()
        })
        return map
    }
}
