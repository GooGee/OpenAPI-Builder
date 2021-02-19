import Item from '../Base/Item'
import KeyValue from '../Base/KeyValue'
import { NameValueManager } from './NameValue'

export default class Discriminator extends Item {
    propertyName = ''
    readonly manager = new NameValueManager()

    toOAPI() {
        const result: KeyValue = {
            propertyName: this.propertyName,
            mapping: this.manager.toOAPI(),
        }
        return result
    }
}
