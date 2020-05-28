import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Reference, { ReferenceType } from "./Reference"

export enum DataType {
    array = 'array',
    boolean = 'boolean',
    composition = 'composition',
    integer = 'integer',
    number = 'number',
    object = 'object',
    reference = 'reference',
    string = 'string',
}

export default class Schema extends UniqueItem {
    type: DataType = DataType.string
    format: string = ''
    itemType: DataType = DataType.string
    readonly reference = new Reference('Schema', ReferenceType.schemas)
    readonly schemaManager = new SchemaManager

    get isPrimitive() {
        return this.checkPrimitive(this.type)
    }

    get isItemReference() {
        return this.checkPrimitive(this.itemType) === false
    }

    checkPrimitive(type: DataType) {
        return ['boolean', 'integer', 'number', 'string'].indexOf(type) > -1
    }

    toAPI(): KeyValue {
        if (this.type === DataType.reference) {
            return this.reference.toAPI()
        }

        if (this.type === DataType.array) {
            if (this.isItemReference) {
                return {
                    type: this.type,
                    items: this.reference.toAPI()
                }
            }
            return {
                type: this.type,
                items: {
                    type: this.itemType
                }
            }
        }

        if (this.type === DataType.composition) {
            const list = this.schemaManager.list.map(item => item.toAPI())
            return {
                allOf: list
            }
        }

        if (this.type === DataType.object) {
            return {
                type: this.type,
                properties: this.schemaManager.toAPI()
            }
        }

        return {
            type: this.type
        }
    }
}

export class SchemaManager extends UniqueList<Schema> {

    constructor() {
        super(Schema)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
