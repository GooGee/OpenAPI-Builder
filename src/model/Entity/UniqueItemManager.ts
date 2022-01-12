import { filter } from '../Service/Text'
import ObjectMap from './ObjectMap'
import ReferenceFinderInterface from './ReferenceFinderInterface'
import UIItemManager from './UIItemManager'
import UniqueItemInterface from './UniqueItemInterface'
import UniqueItemManagerInterface from './UniqueItemManagerInterface'

export default class UniqueItemManager<
        T extends UniqueItemInterface = UniqueItemInterface,
    >
    extends UIItemManager<T>
    implements UniqueItemManagerInterface
{
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

        this.throwIfFindUN(un)
        item.un = un
    }

    filter(keyword: string) {
        return filter(keyword, this.list)
    }

    findByUN(name: string) {
        return this.list.find((item) => item.un === name)
    }

    findByUNOrMakeAdd(name: string) {
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

    protected loadItem(item: UniqueItemInterface) {
        return this.make(item.un)
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

    throwIfNotUnique(item: T) {
        this.throwIfFindUN(item.un)
    }

    toJSON() {
        return {
            nextUI: this._nextUI,
            list: this.list,
        }
    }

    toOAPI(finder: ReferenceFinderInterface) {
        return this.arrayToOAPI(this.list, finder)
    }

    get unxx() {
        return this.list.map((item) => item.un)
    }
}
