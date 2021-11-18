import KeyValue from '../Entity/KeyValue'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'

export default class ServerVariable extends SideBarItem {
    default = ''
    description = ''
    readonly valueManager = new UniqueItemManager(UniqueItem)

    toOAPI() {
        const result: KeyValue = {
            default: this.default,
            description: this.description,
        }
        if (this.valueManager.list.length) {
            result.enum = this.valueManager.list.map(value => value.un)
        }
        return result
    }
}

export class ServerVariableManager extends UniqueItemManager<ServerVariable> {
    constructor() {
        super(ServerVariable)
    }
}
