import Item from '../Base/Item'
import KeyValue from '../Base/KeyValue'
import { ValueItemManager } from '../Base/ValueItem'

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
