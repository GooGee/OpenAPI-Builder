import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import External from './External'

export default class Tag extends SideBarItem {
    description = ''
    // readonly externalDocs = new External
}

export class TagManager extends UniqueItemManager<Tag> {
    constructor() {
        super(Tag)
    }
}
