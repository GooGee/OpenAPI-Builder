import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import External from './External'

interface OAPITag {
    name: string
    description?: string
}

export default class Tag extends SideBarItem {
    description = ''
    // readonly externalDocs = new External

    toOAPI() {
        const result: OAPITag = {
            name: this.un,
        }
        if (this.description) {
            result.description = this.description
        }
        return result
    }
}

export class TagManager extends UniqueItemManager<Tag> {
    constructor() {
        super(Tag)
    }
}
