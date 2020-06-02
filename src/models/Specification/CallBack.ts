import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class CallBack extends UniqueItem {
    toAPI() {
        return this
    }
}

export class CallBackManager extends UniqueList<CallBack> {

    constructor() {
        super(CallBack)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
