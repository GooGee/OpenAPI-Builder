import KeyValue from '../Entity/KeyValue'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { ServerVariableManager } from './ServerVariable'

export default class Server extends SideBarItem {
    description = ''
    readonly variableManager = new ServerVariableManager()

    get url() {
        return this.un
    }

    set url(name: string) {
        this.un = name
    }

    toOAPI(finder: ReferenceFinder) {
        const result: KeyValue = {
            url: this.url,
            description: this.description,
        }
        if (this.variableManager.list.length) {
            result.variables = this.variableManager.toOAPI(finder)
        }
        return result
    }
}

export class ServerManager extends UniqueItemManager<Server> {
    constructor() {
        super(Server)
    }
}
