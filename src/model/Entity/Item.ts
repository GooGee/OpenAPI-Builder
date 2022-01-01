import {
    getExcludedList,
    getIncludedList,
    getOAPIExcludedList,
    getOAPIIncludedList,
} from '../Decorator'
import ItemInterface from './ItemInterface'
import Loadable from './Loadable'
import ObjectMap from './ObjectMap'

export default class Item extends Loadable implements ItemInterface {
    protected getDescriptor(name: PropertyKey) {
        let descriptor = undefined
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

    load(source: this) {
        const list = this.getKeyList() as [keyof this]
        list.forEach((name) => this.loadProperty(name, source))
    }

    protected loadProperty(name: keyof this, source: this) {
        // console.log('-- load Property ' + name)
        const data = source[name]
        if (data === undefined) {
            return
        }

        const descriptor = this.getDescriptor(name)
        if (descriptor === undefined) {
            return
        }

        if (descriptor.writable) {
            // ok
        } else if (descriptor.get && descriptor.set) {
            // ok
        } else {
            return
        }

        const property = this[name]
        if (property instanceof Loadable) {
            property.load(data as any)
        } else {
            this[name] = data
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
            } else {
                result[name] = property
            }
        })
        return result
    }
}
