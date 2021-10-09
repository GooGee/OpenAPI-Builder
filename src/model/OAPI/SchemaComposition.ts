import Item from '../Entity/Item'
import KeyValue from '../Entity/KeyValue'
import { CompositionType } from './DataType'
import Discriminator from './Discriminator'
import { ReferenceManager, ReferenceType } from './Reference'

export default class SchemaComposition extends Item {
    readonly discriminator = new Discriminator()
    readonly schemaManager = new ReferenceManager(ReferenceType.schemas)
    type: CompositionType = CompositionType.allOf

    toOAPI() {
        const result: KeyValue = {}
        result[this.type] = this.schemaManager.list.map((item) => item.toOAPI())
        if (this.discriminator.propertyName) {
            result.discriminator = this.discriminator.toOAPI()
        }
        return result
    }
}
