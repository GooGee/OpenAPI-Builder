import Item from '../Entity/Item'
import KeyValue from '../Entity/KeyValue'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { CompositionType } from './DataType'
import Discriminator from './Discriminator'
import { ReferenceManager, TargetType } from './Reference'

export default class SchemaComposition extends Item {
    readonly discriminator = new Discriminator()
    readonly referenceManager = new ReferenceManager(TargetType.schemas)
    readonly requiredManager = new UniqueItemManager(UniqueItem)
    type: CompositionType = CompositionType.allOf

    toOAPI(finder: ReferenceFinder) {
        const result: KeyValue = {
            [this.type]: this.referenceManager.toOAPIArray(finder),
        }
        if (this.discriminator.propertyName) {
            result.discriminator = this.discriminator.toOAPI(finder)
        }
        if (this.requiredManager.list.length) {
            result.required = this.requiredManager.list.map((item) => item.un)
        }
        return result
    }
}
