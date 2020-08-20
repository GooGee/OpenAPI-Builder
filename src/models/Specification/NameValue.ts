import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class NameValue extends UniqueItem {
    value: string = ''

    toOAPI() {
        return this.value
    }
}

export class NameValueManager extends UniqueList<NameValue> {

    constructor() {
        super(NameValue)
    }

    toOAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
