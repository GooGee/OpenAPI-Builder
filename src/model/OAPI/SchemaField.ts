import KeyValue from '../Entity/KeyValue'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import DataType from './DataType'
import Reference, { TargetType } from './Reference'
import Schema from './Schema'

export default class SchemaField extends Schema {
    example = ''
    format = ''
    isArray = false
    required = true
    schemaUI = 0
    type: DataType = DataType.string

    readonly reference = new Reference(0, TargetType.schemas)

    refer(ui: number) {
        this.type = DataType.reference
        this.reference.ui = ui
    }

    makeArray(finder: ReferenceFinder) {
        return {
            type: 'array',
            items: this.makeData(finder),
        }
    }

    makeData(finder: ReferenceFinder) {
        if (this.type === DataType.reference) {
            return this.reference.toOAPI(finder)
        }

        const result: KeyValue = {
            type: this.type,
        }
        if (this.example) {
            result.example = this.example
        }
        if (this.format) {
            result.format = this.format
        }
        return result
    }

    toOAPI(finder: ReferenceFinder) {
        if (this.isArray) {
            return this.makeArray(finder)
        }

        return this.makeData(finder)
    }
}

export class SchemaFieldManager extends UniqueItemManager<SchemaField> {
    constructor(unique = true) {
        super(SchemaField, unique)
    }

    add(item: SchemaField) {
        const found = this.list.find(
            (field) => field.schemaUI === item.schemaUI && field.un === item.un,
        )
        if (found) {
            throw new Error(`Field ${item.un} already exists!`)
        }
        super.add(item)
    }

    findAll(ui: number) {
        return this.list.filter((field) => field.schemaUI === ui)
    }
}
