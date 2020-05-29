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
        return this.list
    }
}
