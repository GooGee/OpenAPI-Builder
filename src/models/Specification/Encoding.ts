import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Encoding extends UniqueItem {
    toAPI() {
        return this
    }
}

export class EncodingManager extends UniqueList<Encoding> {

    constructor() {
        super(Encoding)
    }

    toAPI() {
        return this.list
    }
}
