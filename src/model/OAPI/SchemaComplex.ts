import KeyValue from '../Entity/KeyValue'
import UniqueItemManager from '../Entity/UniqueItemManager'
import DataType from './DataType'
import Schema from './Schema'
import SchemaComposition from './SchemaComposition'
import { SchemaFieldManager } from './SchemaField'

export default class SchemaComplex extends Schema {
    example = ''
    isTemplate = false
    readonly composition = new SchemaComposition()
    readonly fieldManager = new SchemaFieldManager()
    readonly type = DataType.object

    get empty() {
        return (
            this.composition.referenceManager.list.length === 0 &&
            this.fieldManager.list.length === 0 &&
            this.text === ''
        )
    }

    get isComposition() {
        return this.isTemplate === false
    }

    field2KV() {
        const result: KeyValue = {
            type: this.type,
            properties: this.fieldManager.toOAPI(),
        }
        const list = this.fieldManager.list
            .filter((one) => one.required)
            .map((one) => one.un)
        if (list.length) {
            result.required = list
        }
        if (this.example) {
            result.example = this.example
        }
        return result
    }

    toOAPI() {
        if (this.isTemplate) {
            return JSON.parse(this.text)
        }

        if (this.composition.referenceManager.list.length) {
            const data = this.composition.toOAPI()
            const list = data[this.composition.type] as any
            list.push(this.field2KV())
            return data
        }

        return this.field2KV()
    }
}

export class SchemaManager extends UniqueItemManager<SchemaComplex> {
    constructor() {
        super(SchemaComplex)
    }
}
