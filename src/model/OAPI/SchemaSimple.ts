import KeyValue from '../Base/KeyValue'
import Reference, { ReferenceType } from './Reference'
import Schema from './Schema'
import { SimpleType } from './DataType'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class SchemaSimple extends Schema {
    type: SimpleType = SimpleType.string

    readonly reference = new Reference('', ReferenceType.schemas)

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
}

export class SchemaSimpleManager extends UniqueItemManager<SchemaSimple> {
    constructor() {
        super(SchemaSimple)
    }
}
