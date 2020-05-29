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
        return this.list
    }
}
