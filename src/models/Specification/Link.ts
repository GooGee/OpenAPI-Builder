import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Link extends UniqueItem {
    toOAPI() {
        return this
    }
}

export class LinkManager extends UniqueList<Link> {

    constructor() {
        super(Link)
    }

    toOAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
