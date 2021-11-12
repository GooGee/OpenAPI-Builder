import KeyValue from '../Entity/KeyValue'
import UIItem, { UIItemManager } from '../Entity/UIItem'
import UniqueItem from '../Entity/UniqueItem'
import ReferenceFinder from '../Service/ReferenceFinder'

export enum TargetType {
    examples = 'examples',
    field = 'field',
    headers = 'headers',
    links = 'links',
    parameters = 'parameters',
    paths = 'paths',
    requestBodies = 'requestBodies',
    responses = 'responses',
    schemas = 'schemas',
    security = 'security',
    tag = 'tag',
}

export default class Reference extends UIItem {
    constructor(ui: number, readonly type: TargetType) {
        super()
        this.ui = ui
    }

    get ui() {
        return this._ui
    }

    set ui(ui: number) {
        this._ui = ui
    }

    getText<T extends UniqueItem>(source: T) {
        if (this.type === 'paths') {
            const name = source.un.split('/').join('~1')
            return `#/${this.type}/${name}`
        }
        return `#/components/${this.type}/${source.un}`
    }

    toOAPI(finder: ReferenceFinder) {
        const target = finder.find(this.ui, this.type)
        return this.toOAPIofTarget(target)
    }

    toOAPIofTarget<T extends UniqueItem>(target?: T) {
        if (target === undefined) {
            return {
                $ref: '??',
            }
        }
        return {
            $ref: this.getText(target),
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

    getTargetxx(finder: ReferenceFinder) {
        if (this.list.length === 0) {
            return []
        }

        const manager = finder.findManager(this.targetType) as UIItemManager<UniqueItem>
        const set = new Set(this.list.map((item) => item.ui))
        return manager.list.filter((target) => set.has(target.ui))
    }

    make(ui: number) {
        const item = new this.type(ui, this.targetType)
        return item
    }

    toOAPI(finder: ReferenceFinder) {
        const targetxx = this.getTargetxx(finder)
        const map: KeyValue = {}
        this.list.forEach((item) => {
            const found = targetxx.find((aa) => aa.ui === item.ui)
            if (found) {
                map[found.un] = item.toOAPIofTarget(found)
            }
        })
        return map
    }

    toOAPIArray(finder: ReferenceFinder) {
        const targetxx = this.getTargetxx(finder)
        return this.list.map((item) => {
            const found = targetxx.find((aa) => aa.ui === item.ui)
            if (found) {
                item.toOAPIofTarget(found)
            }
        })
    }
}
