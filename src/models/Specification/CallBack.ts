import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class CallBack extends UniqueItem {
    toOAPI() {
        return this
    }
}

export class CallBackManager extends UniqueList<CallBack> {

    constructor() {
        super(CallBack)
    }

    toOAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
