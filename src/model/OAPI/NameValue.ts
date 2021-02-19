import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'

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
