import KeyValue from '../Entity/KeyValue'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { TargetType } from './Reference'
import Schema from './Schema'
import SchemaComposition from './SchemaComposition'
import { SchemaFieldManager } from './SchemaField'

export default class SchemaComplex extends Schema {
    example = ''
    isTemplate = false
    readonly composition = new SchemaComposition()

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
        if (this.example) {
            result.example = this.example
        }
        return result
    }

    toOAPI(finder: ReferenceFinder) {
        if (this.isTemplate) {
            return JSON.parse(this.text)
        }

        const fieldManager = finder.findManager(TargetType.field) as SchemaFieldManager
        if (this.composition.referenceManager.list.length) {
            const data = this.composition.toOAPI(finder)
            const item = this.field2KV(finder, fieldManager)
            if (item === null) {
                return data
            }
            const list = data[this.composition.type] as KeyValue[]
            list.push(item)
            return data
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
