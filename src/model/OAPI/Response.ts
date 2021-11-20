import ObjectMap from '../Entity/ObjectMap'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { MediaTypeManager, OAPIMediaType } from './MediaType'
import { OAPIReferenceMap, ReferenceManager, TargetType } from './Reference'

interface OAPIResponse {
    content: ObjectMap<OAPIMediaType>
    description: string
    headers: OAPIReferenceMap
}

export default class Response extends SideBarItem {
    description = ''
    readonly headerManager = new ReferenceManager(TargetType.headers)
    readonly linkManager = new ReferenceManager(TargetType.links)
    readonly mediaTypeManager = new MediaTypeManager()

    toOAPI(finder: ReferenceFinder): OAPIResponse {
        return {
            content: this.mediaTypeManager.toOAPI(finder),
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
