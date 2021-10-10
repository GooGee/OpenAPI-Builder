import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class ValueItem extends UniqueItem {
    value = ''

    toOAPI() {
        return this.value
    }
}

export class ValueItemManager extends UniqueItemManager<ValueItem> {
    constructor() {
        super(ValueItem)
    }
}
