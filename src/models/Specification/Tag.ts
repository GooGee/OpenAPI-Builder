import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import External from "./External"

export default class Tag extends UniqueItem {
    description: string = ''
    readonly externalDocs = new External

    toAPI() {
        if (this.externalDocs.url) {
            return {
                name: this.name,
                description: this.description,
                externalDocs: this.externalDocs.toAPI(),
            }
        }

        return {
            name: this.name,
            description: this.description,
        }
    }
}

export class TagManager extends UniqueList<Tag> {

    constructor() {
        super(Tag)
    }

    toAPI() {
        return this.list.map(tag => tag.toAPI())
    }
}
