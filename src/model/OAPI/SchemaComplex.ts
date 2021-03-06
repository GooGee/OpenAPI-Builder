import Schema from './Schema'
import UniqueItemManager from '../Base/UniqueItemManager'
import SchemaComposition from './SchemaComposition'
import SchemaObject from './SchemaObject'

export enum SchemaType {
    composition = 'composition',
    object = 'object',
    template = 'template',
}

export const schemaTypeList = Object.keys(SchemaType)

export default class SchemaComplex extends Schema {
    type: SchemaType = SchemaType.object
    readonly composition = new SchemaComposition()
    readonly object = new SchemaObject()

    get empty() {
        return (
            this.composition.schemaManager.list.length === 0 &&
            this.object.schemaManager.list.length === 0 &&
            (this.text === '' || this.text === '{}')
        )
    }

    get isComposition() {
        return this.type === SchemaType.composition
    }

    get isObject() {
        return this.type === SchemaType.object
    }

    get isTemplate() {
        return this.type === SchemaType.template
    }

    toOAPI() {
        if (this.isTemplate) {
            return JSON.parse(this.text)
        }

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
