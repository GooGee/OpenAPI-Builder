import Item from '../Entity/Item'
import KeyValue from '../Entity/KeyValue'
import { ValueItemManager } from '../Entity/ValueItem'

export default class Discriminator extends Item {
    propertyName = ''
    readonly manager = new ValueItemManager()

    toOAPI() {
        const result: KeyValue = {
            propertyName: this.propertyName,
            mapping: this.manager.toOAPI(),
        }
        return result
    }
}
