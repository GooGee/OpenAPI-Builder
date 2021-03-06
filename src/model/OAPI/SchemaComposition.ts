import Discriminator from './Discriminator'
import KeyValue from '../Base/KeyValue'
import Item from '../Base/Item'
import { ReferenceManager, ReferenceType } from './Reference'
import { CompositionType } from './DataType'

export default class SchemaComposition extends Item {
    readonly discriminator = new Discriminator()
    readonly schemaManager = new ReferenceManager(ReferenceType.schemas)
    type: CompositionType = CompositionType.allOf

    toOAPI() {
        const result: KeyValue = {}
        result[this.type] = this.schemaManager.list.map(item => item.toOAPI())
        if (this.discriminator.propertyName) {
            result.discriminator = this.discriminator.toOAPI()
        }
        return result
    }
}
