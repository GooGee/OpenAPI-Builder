import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { ReferenceManager } from './Reference'
import { OAPIServerVariable } from './ServerVariable'
import TargetType from './TargetType'

export interface OAPIServer {
    description: string
    url: string
    variables?: ObjectMap<OAPIServerVariable>
}

export default class Server extends SideBarItem {
    readonly referenceManager = new ReferenceManager(TargetType.variable)

    get url() {
        return this.un
    }

    set url(name: string) {
        this.un = name
    }

    toOAPI(finder: ReferenceFinderInterface) {
        const result: OAPIServer = {
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

    toOAPIArray(finder: ReferenceFinderInterface) {
        return this.list.map((item) => item.toOAPI(finder))
    }
}
