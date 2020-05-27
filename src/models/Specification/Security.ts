import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Security extends UniqueItem {
    readonly valueManager = new UniqueList(UniqueItem)

    toAPI() {
        return this.valueManager.list.map(value => value.name)
    }
}

export class SecurityManager extends UniqueList<Security> {

    constructor() {
        super(Security)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
