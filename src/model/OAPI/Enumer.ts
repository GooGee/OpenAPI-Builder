import SideBarItem from '../Entity/SideBarItem'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'

export interface OAPIEnumer {
    type: string
    description: string
    enum: string[]
}

export default class Enumer extends SideBarItem {
    default = ''
    readonly valueManager = new UniqueItemManager(UniqueItem)

    toOAPI(): OAPIEnumer {
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
