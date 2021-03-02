import KeyValue from '../Base/KeyValue'
import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import External from './External'

export default class Tag extends SideBarItem {
    description = ''
    // readonly externalDocs = new External

    toOAPI() {
        const result: KeyValue = {
            name: this.ui,
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
