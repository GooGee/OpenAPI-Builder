import ItemManager from './ItemManager'
import UniqueItem from './UniqueItem'
import Newable from './Newable'
import KeyValue from './KeyValue'
import { filter } from '../Service/Text'

export default class UniqueItemManager<T extends UniqueItem> extends ItemManager<T> {
    private nextUI = 1

    constructor(type: Newable<T>) {
        super(type)
    }

    add(item: T) {
        this.throwIfExist(item.un)
        super.add(item)
        item.ui = this.nextUI
        this.nextUI += 1
    }

    filter(keyword: string) {
        return filter(keyword, this.list)
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

    has(name: string) {
        return this.find(name) !== undefined
    }

    load(manager: UniqueItemManager<T>) {
        manager.list.forEach((item) => {
            const iii = this.make(item.un)
            iii.load(item)
            this.list.push(iii)
        })
        this.nextUI = manager.nextUI ?? this.nextUI
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

    throwIfExist(name: string) {
        if (this.find(name)) {
            throw new Error(`${this.type.name} ${name} already exists!`)
        }
    }

    toJSON() {
        return {
            nextUI: this.nextUI,
            list: this.list,
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
