import KeyValue from './KeyValue'
import UniqueItemManager from './UniqueItemManager'

export default class Item {
    toOAPI(): KeyValue {
        const result: KeyValue = {}
        Object.getOwnPropertyNames(this).forEach(name => {
            const item = this[name as keyof this]
            if (item instanceof Item) {
                result[name] = item.toOAPI()
            } else if (item instanceof UniqueItemManager) {
                result[name] = item.toOAPI()
            } else {
                Object.assign(result[name], item)
            }
        })
        return result
    }
}
