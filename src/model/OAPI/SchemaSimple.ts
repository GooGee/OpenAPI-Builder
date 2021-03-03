import KeyValue from '../Base/KeyValue'
import UniqueItemManager from '../Base/UniqueItemManager'
import { SimpleType } from './DataType'
import Reference, { ReferenceType } from './Reference'
import Schema from './Schema'

export default class SchemaSimple extends Schema {
    example = ''
    format = ''
    isArray = false
    required = true
    type: SimpleType = SimpleType.string

    readonly reference = new Reference('', ReferenceType.schemas)

    refer(ui: string, type: ReferenceType = ReferenceType.schemas) {
        this.type = SimpleType.reference
        this.reference.ui = ui
        this.reference.type = type
    }

    makeArray() {
        const data: KeyValue = {
            type: 'array',
            items: this.makeData(),
        }
        return data
    }

    makeData() {
        if (this.type === SimpleType.reference) {
            return this.reference.toOAPI()
        }

        const data: KeyValue = {
            type: this.type,
        }
        if (this.example) {
            data.example = this.example
        }
        if (this.format) {
            data.format = this.format
        }
        return data
    }

    toOAPI() {
        if (this.type === SimpleType.template) {
            return JSON.parse(this.text)
        }

        if (this.isArray) {
            return this.makeArray()
        }

        const data = this.makeData()
        return data
    }
}

export class SchemaSimpleManager extends UniqueItemManager<SchemaSimple> {
    constructor() {
        super(SchemaSimple)
    }
}
