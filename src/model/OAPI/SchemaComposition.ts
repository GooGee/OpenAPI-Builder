import Item from '../Entity/Item'
import KeyValue from '../Entity/KeyValue'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { CompositionType } from './DataType'
import Discriminator from './Discriminator'
import { ReferenceManager, ReferenceType } from './Reference'

export default class SchemaComposition extends Item {
    readonly discriminator = new Discriminator()
    readonly referenceManager = new ReferenceManager(ReferenceType.schemas)
    readonly requiredManager = new UniqueItemManager(UniqueItem)
    type: CompositionType = CompositionType.allOf

    toOAPI() {
        const result: KeyValue = {
            [this.type]: this.referenceManager.list.map((item) => item.toOAPI()),
            required: this.requiredManager.list.map((item) => item.un),
        }
        if (this.discriminator.propertyName) {
            result.discriminator = this.discriminator.toOAPI()
        }
        return result
    }
}
