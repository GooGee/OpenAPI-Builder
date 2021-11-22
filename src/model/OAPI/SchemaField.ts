import Enumer from '../Entity/Enumer'
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

    get isObject() {
        return this.type === DataType.object
    }

    get isReference() {
        return this.isEnumer || this.isObject || this.type === DataType.reference
    }

    get type() {
        return this._type
    }

    set type(type: DataType) {
        this._type = type
        if (type === DataType.enumer) {
            this.reference.type = TargetType.enumer
        } else if (type === DataType.object) {
            this.reference.type = TargetType.encoding
        } else if (type === DataType.reference) {
            this.reference.type = TargetType.schemas
        }
    }

    refer(ui: number) {
        this.reference.ui = ui
    }

    makeData(finder: ReferenceFinder) {
        if (this.isEnumer) {
            const target = this.reference.getTarget(finder) as Enumer
            if (target === undefined) {
                throw new Error(`Enumer ${this.reference.ui} not found`)
            }
            return target.toOAPI()
        }
        if (this.type === DataType.reference) {
            return this.reference.toOAPI(finder)
        }

        const result: OAPISchemaField = {
            type: this.type,
        }
        if (this.format) {
            result.format = this.format
        }
        if (this.readOnly) {
            result.readOnly = this.readOnly
        }
        if (this.writeOnly) {
            result.writeOnly = this.writeOnly
        }
        return result
    }

    toOAPI(finder: ReferenceFinder): OAPISchemaField | OAPIReference {
        const data = this.makeData(finder)
        if (this.isArray) {
            return {
                type: 'array',
                items: data,
            }
        }
        return data
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
