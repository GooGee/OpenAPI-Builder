import JSONText from '../Entity/JSONText'
import KeyValue from '../Entity/KeyValue'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { CompositionType } from './DataType'
import Discriminator from './Discriminator'
import { ReferenceManager, TargetType } from './Reference'
import Schema from './Schema'
import { SchemaFieldManager } from './SchemaField'

export default class SchemaComplex extends Schema {
    compositionType: CompositionType = CompositionType.allOf
    isTemplate = false
    readonly discriminator = new Discriminator()
    readonly example = new JSONText()
    readonly referenceManager = new ReferenceManager(TargetType.schemas)
    readonly requiredManager = new ReferenceManager(TargetType.field)
    readonly text = new JSONText()

    get isComposition() {
        return this.isTemplate === false
    }

    field2KV(finder: ReferenceFinder, fieldManager: SchemaFieldManager) {
        const fieldxx = fieldManager.findAll(this.ui)
        if (fieldxx.length === 0) {
            return null
        }

        const result: KeyValue = {
            type: 'object',
            properties: fieldManager.arrayToOAPI(fieldxx, finder),
        }
        const list = fieldxx.filter((one) => one.required).map((one) => one.un)
        if (list.length) {
            result.required = list
        }
        if (this.example.text === '{}') {
            return result
        }
        result.example = this.example.toOAPI()
        return result
    }

    toOAPI(finder: ReferenceFinder) {
        if (this.isTemplate) {
            return this.text.toOAPI()
        }

        const fieldManager = finder.findManager(TargetType.field) as SchemaFieldManager
        if (this.referenceManager.list.length) {
            const list = this.referenceManager.toOAPIArray(finder)
            const result: KeyValue = {
                [this.compositionType]: list,
            }
            if (this.discriminator.propertyName) {
                result.discriminator = this.discriminator.toOAPI(finder)
            }
            if (this.requiredManager.list.length) {
                result.required = this.requiredManager
                    .getTargetxx(finder)
                    .map((item) => item.un)
            }
            const item = this.field2KV(finder, fieldManager)
            if (item === null) {
                return result
            }
            list.push(item)
            return result
        }

        const item = this.field2KV(finder, fieldManager)
        if (item === null) {
            return {}
        }
        return item
    }
}

export class SchemaManager extends UniqueItemManager<SchemaComplex> {
    constructor() {
        super(SchemaComplex)
    }

    toOAPI(finder: ReferenceFinder) {
        const map: KeyValue = {}
        this.list.forEach((item) => {
            map[item.un] = item.toOAPI(finder)
        })
        return map
    }
}
