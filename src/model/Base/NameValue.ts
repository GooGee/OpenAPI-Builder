import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class NameValue extends UniqueItem {
    value = ''

    toOAPI() {
        return this.value
    }
}

export class NameValueManager extends UniqueItemManager<NameValue> {
    constructor() {
        super(NameValue)
    }
}
