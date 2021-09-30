import KeyValue from '../Entity/KeyValue'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import External from './External'

export default class Tag extends SideBarItem {
    description = ''
    // readonly externalDocs = new External

    toOAPI() {
        const result: KeyValue = {
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
