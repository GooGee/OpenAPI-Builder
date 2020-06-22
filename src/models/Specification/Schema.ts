import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Reference, { ReferenceType } from "./Reference"
import { DataType, isPrimitive } from "./DataType"
import Discriminator from "./Discriminator"
import XML from "./XML"

export default class Schema extends UniqueItem {
    type: DataType = DataType.string
    format: string = ''
    example: string = ''
    itemType: DataType = DataType.string
    readonly discriminator = new Discriminator
    readonly reference = new Reference('', ReferenceType.schemas)
    readonly schemaManager = new SchemaManager
    readonly xml = new XML

    get isPrimitive() {
        return isPrimitive(this.type)
    }

    get isItemReference() {
        return this.itemType === DataType.reference
    }

    toOAPI(): KeyValue {
        if (this.type === DataType.reference) {
            return this.reference.toOAPI()
        }

        if (this.type === DataType.array) {
            if (this.isItemReference) {
                return {
                    type: this.type,
                    items: this.reference.toOAPI()
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
            const list = this.schemaManager.list.map(item => item.toOAPI())
            return {
                allOf: list
            }
        }

        if (this.type === DataType.object) {
            return {
                type: this.type,
                properties: this.schemaManager.toOAPI()
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

    toOAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
