import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { MediaTypeManager, OAPIMediaType } from './MediaType'
import { OAPIReferenceMap, ReferenceManager } from './Reference'
import TargetType from './TargetType'

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

    toOAPI(finder: ReferenceFinderInterface): OAPIResponse {
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
