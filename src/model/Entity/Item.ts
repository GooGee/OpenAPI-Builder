import {
    getExcludedList,
    getIncludedList,
    getOAPIExcludedList,
    getOAPIIncludedList,
} from '../Decorator'
import ItemManager from './ItemManager'
import ObjectMap from './ObjectMap'

export default class Item {
    protected getDescriptor(name: string) {
        let descriptor = null
        let item: ObjectMap = this as ObjectMap<any>
        while (item) {
            descriptor = Object.getOwnPropertyDescriptor(item, name)
            if (descriptor) {
                return descriptor
            }
            item = Object.getPrototypeOf(item)
        }
        return descriptor
    }

    getKeyList() {
        const excludedxx = getExcludedList(this.constructor)
        const includedxx = getIncludedList(this.constructor)
        // console.log(this.constructor.name, excludedxx, includedxx)
        const list = includedxx.concat(Object.keys(this))
        const set = new Set(list)
        excludedxx.forEach((item) => set.delete(item))
        return Array.from(set.keys())
    }

    getOAPIKeyList() {
        const excludedxx = getOAPIExcludedList(this.constructor)
        const includedxx = getOAPIIncludedList(this.constructor)
        // console.log(this.constructor.name, excludedxx, includedxx)
        const list = includedxx.concat(Object.keys(this))
        const set = new Set(list)
        excludedxx.forEach((item) => set.delete(item))
        return Array.from(set.keys())
    }

    load<T extends Item = Item>(source: T) {
        this.getKeyList().forEach((name) => this.loadProperty(name, source))
    }

    protected loadProperty<T extends Item = Item>(name: string, source: T) {
        // console.log('-- load Property ' + name)
        const data = source[name as keyof T] as any
        if (data === undefined) {
            return
        }

        const descriptor = this.getDescriptor(name)
        if (descriptor) {
            if (descriptor.writable) {
                // ok
            } else if (descriptor.get && descriptor.set) {
                // ok
            } else {
                return
            }

            const key = name as keyof this
            const property = this[key]
            if (property instanceof Item) {
                property.load(data)
            } else if (property instanceof ItemManager) {
                property.load(data)
            } else {
                this[key] = data
            }
        }
    }

    toJSON() {
        const result: ObjectMap<any> = {}
        this.getKeyList().forEach((name) => (result[name] = this[name as keyof this]))
        return result
    }

    toOAPI(...args: any[]) {
        const result: ObjectMap<any> = {}
        this.getOAPIKeyList().forEach((name) => {
            const property = this[name as keyof this]
            if (property instanceof Item) {
                result[name] = property.toOAPI()
            } else if (property instanceof ItemManager) {
                // result[name] = property.toOAPI()
            } else {
                result[name] = property
            }
        })
        return result
    }
}
