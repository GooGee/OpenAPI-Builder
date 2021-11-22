import SideBarItem from './SideBarItem'
import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class Enumer extends SideBarItem {
    default = ''
    type = 'string'
    readonly valueManager = new UniqueItemManager(UniqueItem)

    toOAPI() {
        return {
            type: this.type,
            description: this.description,
            enum: this.valueManager.toUNArray(),
        }
    }
}

export class EnumerManager extends UniqueItemManager<Enumer> {
    constructor() {
        super(Enumer)
    }
}
