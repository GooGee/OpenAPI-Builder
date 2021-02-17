import KeyValue from '../Base/KeyValue'
import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class ServerVariable extends UniqueItem {
    default = ''
    description = ''
    readonly valueManager = new UniqueItemManager(UniqueItem)

    toOAPI() {
        const result: KeyValue = {
            default: this.default,
            description: this.description,
        }
        if (this.valueManager.list.length) {
            result.enum = this.valueManager.list.map(value => value.ui)
        }
        return result
    }
}

export class ServerVariableManager extends UniqueItemManager<ServerVariable> {
    constructor() {
        super(ServerVariable)
    }
}
