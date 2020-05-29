import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class SecurityScheme extends UniqueItem {
    toAPI() {
        return this
    }
}

export class SecuritySchemeManager extends UniqueList<SecurityScheme> {

    constructor() {
        super(SecurityScheme)
    }

    toAPI() {
        return this.list
    }
}
