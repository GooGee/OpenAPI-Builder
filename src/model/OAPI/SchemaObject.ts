import KeyValue from '../Base/KeyValue'
import Item from '../Base/Item'
import { DataType } from './DataType'
import { SchemaSimpleManager } from './SchemaSimple'

export default class SchemaObject extends Item {
    example = ''
    readonly schemaManager = new SchemaSimpleManager()
    readonly type = DataType.object

    toOAPI() {
        const result: KeyValue = {
            type: this.type,
            properties: this.schemaManager.toOAPI(),
        }
        const list = this.schemaManager.list.filter(one => one.required).map(one => one.ui)
        if (list.length) {
            result.required = list
        }
        if (this.example) {
            result.example = this.example
        }
        return result
    }
}
