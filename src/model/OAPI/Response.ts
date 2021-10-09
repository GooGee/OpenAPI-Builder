import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { MediaTypeManager } from './MediaType'
import { ReferenceManager, ReferenceType } from './Reference'

export default class Response extends SideBarItem {
    description = ''
    readonly headerManager = new ReferenceManager(ReferenceType.headers)
    readonly linkManager = new ReferenceManager(ReferenceType.links)
    readonly mediaTypeManager = new MediaTypeManager()

    toOAPI() {
        return {
            content: this.mediaTypeManager.toOAPI(),
            description: this.description,
            headers: this.headerManager.toOAPI(),
        }
    }
}

export class ResponseManager extends UniqueItemManager<Response> {
    constructor() {
        super(Response)
    }
}
