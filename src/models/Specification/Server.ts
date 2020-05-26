import Item from "../Base/Item"
import ItemList from "../Base/ItemList"
import { ServerVariableManager } from "./ServerVariable"

export default class Server extends Item {
    url: string = ''
    description: string = ''
    readonly variableManager = new ServerVariableManager

    toAPI() {
        return {
            url: this.url,
            description: this.description,
            variables: this.variableManager.toAPI()
        }
    }
}

export class ServerManager extends ItemList<Server> {

    constructor() {
        super(Server)
    }

    toAPI() {
        return this.list.map(item => item.toAPI())
    }
}
