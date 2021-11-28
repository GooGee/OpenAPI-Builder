import ObjectMap from '../Entity/ObjectMap'
import UIItem from '../Entity/UIItem'
import UIItemManager from '../Entity/UIItemManager'
import UniqueItem from '../Entity/UniqueItem'
import ReferenceFinder from '../Service/ReferenceFinder'

export enum TargetType {
    encoding = 'encoding',
    enumer = 'enumer',
    examples = 'examples',
    field = 'field',
    headers = 'headers',
    LayerMediaType = 'LayerMediaType',
    LayerOperation = 'LayerOperation',
    LayerPath = 'LayerPath',
    LayerRequestBody = 'LayerRequestBody',
    LayerResponse = 'LayerResponse',
    LayerSchema = 'LayerSchema',
    links = 'links',
    parameters = 'parameters',
    paths = 'paths',
    requestBodies = 'requestBodies',
    responses = 'responses',
    schemas = 'schemas',
    scope = 'scope',
    script = 'script',
    security = 'security',
    tag = 'tag',
    variable = 'variable',
}

export interface OAPIReference {
    $ref: string
}

export interface OAPIReferenceMap extends ObjectMap<OAPIReference> {}

export default class Reference extends UIItem {
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

    getTarget<T extends UniqueItem>(finder: ReferenceFinder) {
        return finder.find<T>(this.ui, this.type)
    }

    getText<T extends UniqueItem>(source: T) {
        if (this.type === 'paths') {
            const name = source.un.split('/').join('~1')
            return `#/${this.type}/${name}`
        }
        return `#/components/${this.type}/${source.un}`
    }

    toOAPI(finder: ReferenceFinder) {
        return this.toOAPIofTarget(this.getTarget(finder))
    }

    toOAPIofTarget<T extends UniqueItem>(target?: T): OAPIReference {
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
        const map: OAPIReferenceMap = {}
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
            return item.toOAPIofTarget(found)
        })
    }

    toUNArray(finder: ReferenceFinder) {
        return this.getTargetxx(finder).map((item) => item.un)
    }
}
