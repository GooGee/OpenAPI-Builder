import Schema from './Schema'
import UniqueItemManager from '../Base/UniqueItemManager'
import SchemaComposition from './SchemaComposition'
import SchemaObject from './SchemaObject'

export default class SchemaComplex extends Schema {
    readonly composition = new SchemaComposition()
    readonly object = new SchemaObject()
    isObject = true

    toOAPI() {
        if (this.isObject) {
            return this.object.toOAPI()
        }
        return this.composition.toOAPI()
    }
}

export class SchemaManager extends UniqueItemManager<SchemaComplex> {
    constructor() {
        super(SchemaComplex)
    }
}
