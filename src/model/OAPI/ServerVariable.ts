import SideBarItem from '../Entity/SideBarItem'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'

export interface OAPIServerVariable {
    default: string
    description: string
    enum?: string[]
}

export default class ServerVariable extends SideBarItem {
    default = ''
    readonly valueManager = new UniqueItemManager(UniqueItem)

    toOAPI() {
        const result: OAPIServerVariable = {
            default: this.default,
            description: this.description,
        }
        if (this.valueManager.list.length) {
            result.enum = this.valueManager.toUNArray()
        }
        return result
    }
}

export class ServerVariableManager extends UniqueItemManager<ServerVariable> {
    constructor() {
        super(ServerVariable)
    }
}
