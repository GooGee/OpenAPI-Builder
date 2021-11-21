import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import DataType from './DataType'
import Reference, { OAPIReference, TargetType } from './Reference'

export interface OAPISchemaField {
    description?: string
    format?: string
    items?: OAPISchemaField | OAPIReference
    readOnly?: boolean
    type: string
    writeOnly?: boolean
}

export default class SchemaField extends UniqueItem {
    description = ''
    format = ''
    isArray = false
    readOnly = false
    required = true
    schemaUI = 0
    protected _type: DataType = DataType.string
    writeOnly = false

    readonly reference = new Reference(0, TargetType.schemas)

    get isEnumer() {
        return this.type === DataType.enumer
    }

    get isReference() {
        return this.isEnumer || this.type === DataType.reference
    }

    get type() {
        return this._type
    }

    set type(type: DataType) {
        this._type = type
        if (type === DataType.enumer) {
            this.reference.type = TargetType.enumer
        } else if (type === DataType.reference) {
            this.reference.type = TargetType.schemas
        }
    }

    refer(ui: number) {
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

        const result: OAPISchemaField = {
            readOnly: this.readOnly,
            type: this.type,
            writeOnly: this.writeOnly,
        }
        if (this.format) {
            result.format = this.format
        }
        return result
    }

    toOAPI(finder: ReferenceFinder): OAPISchemaField | OAPIReference {
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

    findAllField(ui: number) {
        return this.list.filter((field) => field.schemaUI === ui)
    }
}
