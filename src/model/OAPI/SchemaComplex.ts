import UniqueItemManager from '../Entity/UniqueItemManager'
import Schema from './Schema'
import SchemaComposition from './SchemaComposition'
import SchemaObject from './SchemaObject'

export enum SchemaType {
    composition = 'composition',
    template = 'template',
}

export const schemaTypeList = Object.keys(SchemaType)

export default class SchemaComplex extends Schema {
    type: SchemaType = SchemaType.composition
    readonly composition = new SchemaComposition()
    readonly object = new SchemaObject()

    get empty() {
        return (
            this.composition.referenceManager.list.length === 0 &&
            this.object.fieldManager.list.length === 0 &&
            this.text === ''
        )
    }

    get isComposition() {
        return this.type === SchemaType.composition
    }

    get isTemplate() {
        return this.type === SchemaType.template
    }

    toOAPI() {
        if (this.isTemplate) {
            return JSON.parse(this.text)
        }

        if (this.composition.referenceManager.list.length) {
            const data = this.composition.toOAPI()
            const list = data[this.composition.type] as any
            list.push(this.object.toOAPI())
            return data
        }

        return this.object.toOAPI()
    }
}

export class SchemaManager extends UniqueItemManager<SchemaComplex> {
    constructor() {
        super(SchemaComplex)
    }
}
