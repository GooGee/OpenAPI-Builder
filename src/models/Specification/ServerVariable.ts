import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class ServerVariable extends UniqueItem {
    default: string = ''
    description: string = ''
    readonly valueManager = new UniqueList(UniqueItem)

    toAPI() {
        if (this.valueManager.list.length) {
            const list = this.valueManager.list.map(variable => variable.name)
            return {
                default: this.default,
                description: this.description,
                enum: list,
            }
        }

        return {
            default: this.default,
            description: this.description,
        }
    }
}

export class ServerVariableManager extends UniqueList<ServerVariable> {

    constructor() {
        super(ServerVariable)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
