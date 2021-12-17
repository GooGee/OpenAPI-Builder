import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import UIItem from '../Entity/UIItem'
import UIItemManager from '../Entity/UIItemManager'
import UniqueItemInterface from '../Entity/UniqueItemInterface'
import ReferenceInterface, { OAPIReference } from './ReferenceInterface'
import TargetType from './TargetType'

export type OAPIReferenceMap = ObjectMap<OAPIReference>

export default class Reference extends UIItem implements ReferenceInterface {
    constructor(ui: number, public type: TargetType) {
        super()
        this.ui = ui
    }

    get ui() {
        return this._ui
    }

    set ui(ui: number) {
        this._ui = ui
    }

    getTarget<T extends UniqueItemInterface>(
        finder: ReferenceFinderInterface,
    ): T | undefined {
        return finder.find<T>(this)
    }

    getText(finder: ReferenceFinderInterface) {
        const found = this.getTarget(finder)
        if (found === undefined) {
            return '?'
        }
        return this.getTextOfTarget(found)
    }

    getTextOfTarget<T extends UniqueItemInterface>(source: T) {
        if (this.type === 'paths') {
            const name = source.un.split('/').join('~1')
            return `#/${this.type}/${name}`
        }
        return `#/components/${this.type}/${source.un}`
    }

    toOAPI(finder: ReferenceFinderInterface) {
        return this.toOAPIofTarget(this.getTarget(finder))
    }

    toOAPIofTarget<T extends UniqueItemInterface>(target?: T): OAPIReference {
        if (target === undefined) {
            return {
                $ref: '?',
            }
        }
        return {
            $ref: this.getTextOfTarget(target),
        }
    }
}

export class ReferenceManager extends UIItemManager<Reference> {
    constructor(readonly targetType: TargetType) {
        super(Reference)
    }

    add(item: Reference) {
        this.throwIfFind(item.ui)
        this.list.push(item)
    }

    getTargetxx(finder: ReferenceFinderInterface) {
        if (this.list.length === 0) {
            return []
        }

        const manager = finder.findManager(this.targetType)
        const set = new Set(this.list.map((item) => item.ui))
        return manager.list.filter((target) => set.has(target.ui))
    }

    make(ui: number) {
        const item = new this.type(ui, this.targetType)
        return item
    }

    toOAPI(finder: ReferenceFinderInterface) {
        const targetxx = this.getTargetxx(finder)
        const map: OAPIReferenceMap = {}
        this.list.forEach((item) => {
            const found = targetxx.find((aa) => aa.ui === item.ui)
            if (found) {
                map[found.un] = item.toOAPIofTarget(found)
            }
        })
        return map
    }

    toOAPIArray(finder: ReferenceFinderInterface) {
        const targetxx = this.getTargetxx(finder)
        return this.list.map((item) => {
            const found = targetxx.find((aa) => aa.ui === item.ui)
            return item.toOAPIofTarget(found)
        })
    }

    toUNArray(finder: ReferenceFinderInterface) {
        return this.getTargetxx(finder).map((item) => item.un)
    }
}
