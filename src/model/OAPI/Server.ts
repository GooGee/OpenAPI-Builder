import KeyValue from '../Entity/KeyValue'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { ReferenceManager, TargetType } from './Reference'

export default class Server extends SideBarItem {
    readonly referenceManager = new ReferenceManager(TargetType.variable)

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
        if (this.referenceManager.list.length) {
            result.variables = finder.findManager(TargetType.variable).toOAPI(finder)
        }
        return result
    }
}

export class ServerManager extends UniqueItemManager<Server> {
    constructor() {
        super(Server)
    }

    toOAPIArray(finder: ReferenceFinder) {
        return this.list.map((item) => item.toOAPI(finder))
    }
}
