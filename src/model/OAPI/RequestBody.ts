import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import { MediaTypeManager } from './MediaType'

export default class RequestBody extends UniqueItem {
    required = true
    description = ''
    readonly mediaTypeManager = new MediaTypeManager()
}

export class RequestBodyManager extends UniqueItemManager<RequestBody> {
    constructor() {
        super(RequestBody)
    }
}
