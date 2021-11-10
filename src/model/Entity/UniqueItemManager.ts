import { filter } from '../Service/Text'
import KeyValue from './KeyValue'
import Newable from './Newable'
import { UIItemManager } from './UIItem'
import UniqueItem from './UniqueItem'

export default class UniqueItemManager<T extends UniqueItem> extends UIItemManager<T> {
    constructor(type: Newable<T>, readonly unique = true) {
        super(type)
    }

    add(item: T) {
        if (this.unique) {
            this.throwIfFindUN(item.un)
        }
        super.add(item)
    }

    arrayToOAPI(list: T[]) {
        const map: KeyValue = {}
        list.forEach((item) => {
            map[item.un] = item.toOAPI()
        })
        return map
    }

    filter(keyword: string) {
        return filter(keyword, this.list)
    }

    findByUN(name: string) {
        return this.list.find((item) => item.un === name)
    }

    findOrMake(name: string) {
        let found = this.findByUN(name)
        if (found === undefined) {
            found = this.make(name)
            this.add(found)
        }
        return found
    }

    hasSame(ui: number, un: string) {
        const found = this.list.find((field) => field.ui === ui && field.un === un)
        return found !== undefined
    }

    hasUN(name: string) {
        return this.findByUN(name) !== undefined
    }

    load(manager: UniqueItemManager<T>) {
        manager.list.forEach((item) => {
            const ii = this.make(item.un)
            ii.load(item)
            if (ii.ui === 0) {
                this.add(ii)
            } else {
                this.list.push(ii)
            }
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

    throwIfFindUN(name: string) {
        if (this.findByUN(name)) {
            throw new Error(`${this.type.name} ${name} already exists!`)
        }
    }

    toJSON() {
        return {
            nextUI: this.nextUI,
            list: this.list,
        }
    }

    toOAPI(...args: any[]) {
        return this.arrayToOAPI(this.list)
    }
}
