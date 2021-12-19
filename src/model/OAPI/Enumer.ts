import SideBarItem from '../Entity/SideBarItem'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'

export default class Enumer extends SideBarItem {
    default = ''
    readonly valueManager = new UniqueItemManager(UniqueItem)

    toOAPI() {
        return {
            type: 'string',
            description: this.description,
            enum: this.valueManager.unxx,
        }
    }
}

export class EnumerManager extends UniqueItemManager<Enumer> {
    constructor() {
        super(Enumer)
    }
}
