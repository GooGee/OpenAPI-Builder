import ItemManager from './ItemManager'
import UniqueItem from './UniqueItem'
import Newable from './Newable'
import KeyValue from './KeyValue'

export default class UniqueItemManager<T extends UniqueItem> extends ItemManager<T> {
    private nextId = 1

    constructor(type: Newable<T>) {
        super(type)
    }

    throwIfExist(name: string) {
        if (this.find(name)) {
            throw new Error(`${this.type.name} ${name} already exists!`)
        }
    }

    add(item: T) {
        this.throwIfExist(item.un)
        super.add(item)
        item.id = this.nextId
        this.nextId += 1
    }

    find(name: string) {
        return this.list.find((item) => item.un === name)
    }

    findOrMake(name: string) {
        let found = this.find(name)
        if (found === undefined) {
            found = this.make(name)
            this.add(found)
        }
        return found
    }

    loadList(list: T[]) {
        // console.log('-- load UniqueItemManager')
        list.forEach((item) => {
            const iii = this.make(item.un)
            iii.load(item)
            this.list.push(iii)
        })
    }

    make(name: string) {
        const item = new this.type(name)
        return item
    }

    sort(asc = true) {
        if (asc) {
            this.list.sort((aaa, bbb) => aaa.un.localeCompare(bbb.un))
        } else {
            this.list.sort((aaa, bbb) => bbb.un.localeCompare(aaa.un))
        }
    }

    toOAPI() {
        const map: KeyValue = {}
        this.list.forEach((item) => {
            map[item.un] = item.toOAPI()
        })
        return map
    }
}
