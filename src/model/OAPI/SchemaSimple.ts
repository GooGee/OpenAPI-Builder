import KeyValue from '../Entity/KeyValue'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { SimpleType } from './DataType'
import Reference, { ReferenceType } from './Reference'
import Schema from './Schema'

export default class SchemaSimple extends Schema {
    example = ''
    format = ''
    hidden = false
    isArray = false
    required = true
    type: SimpleType = SimpleType.string

    readonly reference = new Reference('', ReferenceType.schemas)

    refer(un: string, type: ReferenceType = ReferenceType.schemas) {
        this.type = SimpleType.reference
        this.reference.un = un
        this.reference.type = type
    }

    makeArray() {
        return {
            type: 'array',
            items: this.makeData(),
        }
    }

    makeData() {
        if (this.type === SimpleType.reference) {
            return this.reference.toOAPI()
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

    toOAPI() {
        if (this.type === SimpleType.template) {
            return JSON.parse(this.text)
        }

        if (this.isArray) {
            return this.makeArray()
        }

        return this.makeData()
    }
}

export class SchemaSimpleManager extends UniqueItemManager<SchemaSimple> {
    constructor() {
        super(SchemaSimple)
    }
}
