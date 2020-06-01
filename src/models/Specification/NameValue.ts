import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class NameValue extends UniqueItem {
    value: string = ''

    toAPI() {
        return this.value
    }
}

export class NameValueManager extends UniqueList<NameValue> {

    constructor() {
        super(NameValue)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
