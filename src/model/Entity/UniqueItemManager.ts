import { filter } from '../Service/Text'
import Newable from './Newable'
import ObjectMap from './ObjectMap'
import ReferenceFinderInterface from './ReferenceFinderInterface'
import UIItemManager from './UIItemManager'
import UniqueItemInterface from './UniqueItemInterface'

export default class UniqueItemManager<
    T extends UniqueItemInterface = UniqueItemInterface,
> extends UIItemManager<T> {
    constructor(type: Newable<T>, readonly unique = true) {
        super(type)
    }

    add(item: T) {
        this.throwIfNotUnique(item)
        super.add(item)
    }

    static arrayToOAPI<T extends UniqueItemInterface = UniqueItemInterface>(
        list: T[],
        finder: ReferenceFinderInterface,
    ) {
        const map: ObjectMap<any> = {}
        list.forEach((item) => (map[item.un] = item.toOAPI(finder)))
        return map
    }

    arrayToOAPI(list: T[], finder: ReferenceFinderInterface) {
        return UniqueItemManager.arrayToOAPI(list, finder)
    }

    changeUN(item: T, un: string) {
        if (item.un === un) {
            return
        }

        this.throwIfNotUnique(item)
        item.un = un
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

    throwIfNotUnique(item: T) {
        if (this.unique === false) {
            return
        }
        if (this.findByUN(item.un)) {
            throw new Error(`${this.type.name} ${item.un} already exists!`)
        }
    }

    toJSON() {
        return {
            nextUI: this.nextUI,
            list: this.list,
        }
    }

    toOAPI(finder: ReferenceFinderInterface) {
        return this.arrayToOAPI(this.list, finder)
    }

    toUNArray() {
        return this.list.map((item) => item.un)
    }
}
