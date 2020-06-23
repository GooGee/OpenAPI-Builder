import KeyValue from "./KeyValue"
import ItemList from "./ItemList"

export default class Item {
    // ignore the Vue Observer
    protected static IgnoreList: Array<string> = ['__ob__']
    protected static IncludeList: Array<string> = []

    get IgnoreList(): Array<string> {
        return Object.getPrototypeOf(this).constructor.IgnoreList
    }

    mustIgnore(name: string) {
        return this.IgnoreList.indexOf(name) > -1
    }

    get IncludeList(): Array<string> {
        return Object.getPrototypeOf(this).constructor.IncludeList
    }

    load(source: Item) {
        this.loadItem(this, source)
    }

    loadItem(me: Item, source: Item) {
        const names = Object.getOwnPropertyNames(source)
        names.forEach(name => {
            this.loadProperty(name, me, source)
        })
    }

    loadProperty(name: string, me: KeyValue, source: KeyValue) {
        if (this.mustIgnore(name)) {
            return
        }

        const descriptor = this.getDescriptor(me, name)
        if (descriptor) {
            if (descriptor.writable) {
                // ok
            } else if (descriptor.get && descriptor.set) {
                // ok
            } else {
                return
            }

            if (me[name] instanceof Item) {
                this.loadItem(me[name], source[name])
            } else if (me[name] instanceof ItemList) {
                this.loadList(me[name], source[name])
            } else {
                // TypeError: 0 is read-only
                // Object.assign(me[name], source[name])
                me[name] = source[name]
            }
        }
    }

    getDescriptor(item: KeyValue, name: string) {
        let descriptor = null
        while (item) {
            descriptor = Object.getOwnPropertyDescriptor(item, name)
            if (descriptor) {
                return descriptor
            }
            item = Object.getPrototypeOf(item)
        }
        return descriptor
    }

    loadList(me: ItemList<Item>, source: ItemList<Item>) {
        me.load(source)
    }

    toJSON(key: string) {
        const me = this as KeyValue
        const names = Object.getOwnPropertyNames(me)
        const result: KeyValue = {}
        names.forEach(name => {
            if (this.mustIgnore(name)) {
                return
            }
            result[name] = me[name]
        })
        this.IncludeList.forEach(name => {
            result[name] = me[name]
        })
        return result
    }

}
