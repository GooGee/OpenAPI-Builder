import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import { MediaTypeManager } from './MediaType'
import { ReferenceManager, ReferenceType } from './Reference'

export default class Response extends UniqueItem {
    description = ''
    readonly headerManager = new ReferenceManager(ReferenceType.headers)
    readonly linkManager = new ReferenceManager(ReferenceType.links)
    readonly mediaTypeManager = new MediaTypeManager()
}

export class ResponseManager extends UniqueItemManager<Response> {
    constructor() {
        super(Response)
    }
}
