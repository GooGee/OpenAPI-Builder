import { ComplexType } from './DataType'
import KeyValue from '../Base/KeyValue'
import Schema from './Schema'
import { SchemaSimpleManager } from './SchemaSimple'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class SchemaComplex extends Schema {
    type: ComplexType = ComplexType.object
    readonly schemaManager = new SchemaSimpleManager()

    makeData() {
        if (this.type === ComplexType.object) {
            const data: KeyValue = {
                type: this.type,
                properties: this.schemaManager.toOAPI(),
            }
            const list = this.schemaManager.list.filter(one => one.required).map(one => one.ui)
            if (list.length) {
                data.required = list
            }
            if (this.example) {
                data.example = this.example
            }
            return data
        }

        const list = this.schemaManager.list.map(item => item.toOAPI())
        const data: KeyValue = {}
        data[this.type] = list
        return data
    }
}

export class SchemaManager extends UniqueItemManager<SchemaComplex> {
    constructor() {
        super(SchemaComplex)
    }
}
