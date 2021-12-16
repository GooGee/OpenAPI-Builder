import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { MediaTypeManager, OAPIMediaType } from './MediaType'

interface OAPIRequestBody {
    content: ObjectMap<OAPIMediaType>
    description: string
    required: boolean
}

export default class RequestBody extends SideBarItem {
    required = true
    description = ''
    readonly mediaTypeManager = new MediaTypeManager()

    toOAPI(finder: ReferenceFinderInterface): OAPIRequestBody {
        return {
            content: this.mediaTypeManager.toOAPI(finder),
            description: this.description,
            required: this.required,
        }
    }
}

export class RequestBodyManager extends UniqueItemManager<RequestBody> {
    constructor() {
        super(RequestBody)
    }
}
