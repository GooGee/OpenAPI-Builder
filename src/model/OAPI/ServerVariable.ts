import Enumer from '../Entity/Enumer'
import UniqueItemManager from '../Entity/UniqueItemManager'

export interface OAPIServerVariable {
    default: string
    description: string
    enum?: string[]
}

export default class ServerVariable extends Enumer {
    toOAPI() {
        const result: OAPIServerVariable = {
            default: this.default,
            description: this.description,
        }
        if (this.valueManager.list.length) {
            result.enum = this.valueManager.list.map((value) => value.un)
        }
        return result
    }
}

export class ServerVariableManager extends UniqueItemManager<ServerVariable> {
    constructor() {
        super(ServerVariable)
    }
}
