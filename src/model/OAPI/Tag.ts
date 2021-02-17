import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import External from './External'

export default class Tag extends UniqueItem {
    description = ''
    // readonly externalDocs = new External
}

export class TagManager extends UniqueItemManager<Tag> {
    constructor() {
        super(Tag)
    }
}
