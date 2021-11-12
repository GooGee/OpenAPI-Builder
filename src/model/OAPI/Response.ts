import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { MediaTypeManager } from './MediaType'
import { ReferenceManager, TargetType } from './Reference'

export default class Response extends SideBarItem {
    description = ''
    readonly headerManager = new ReferenceManager(TargetType.headers)
    readonly linkManager = new ReferenceManager(TargetType.links)
    readonly mediaTypeManager = new MediaTypeManager()

    toOAPI(finder: ReferenceFinder) {
        return {
            content: this.mediaTypeManager.toOAPI(),
            description: this.description,
            headers: this.headerManager.toOAPI(finder),
        }
    }
}

export class ResponseManager extends UniqueItemManager<Response> {
    constructor() {
        super(Response)
    }
}
