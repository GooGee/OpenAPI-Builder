import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import { ServerVariableManager } from './ServerVariable'

export default class Server extends SideBarItem {
    description = ''
    readonly variableManager = new ServerVariableManager()

    get url() {
        return this.ui
    }

    set url(name: string) {
        this.ui = name
    }
}

export class ServerManager extends UniqueItemManager<Server> {
    constructor() {
        super(Server)
    }
}
