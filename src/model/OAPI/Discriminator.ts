import Item from '../Entity/Item'
import KeyValue from '../Entity/KeyValue'
import { ValueItemManager } from '../Entity/ValueItem'
import ReferenceFinder from '../Service/ReferenceFinder'

export default class Discriminator extends Item {
    propertyName = ''
    readonly manager = new ValueItemManager()

    toOAPI(finder: ReferenceFinder) {
        const result: KeyValue = {
            propertyName: this.propertyName,
            mapping: this.manager.toOAPI(finder),
        }
        return result
    }
}
