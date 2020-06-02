import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Link extends UniqueItem {
    toAPI() {
        return this
    }
}

export class LinkManager extends UniqueList<Link> {

    constructor() {
        super(Link)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
