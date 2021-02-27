import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import { MediaTypeManager } from './MediaType'

export default class RequestBody extends SideBarItem {
    required = true
    description = ''
    readonly mediaTypeManager = new MediaTypeManager()
}

export class RequestBodyManager extends UniqueItemManager<RequestBody> {
    constructor() {
        super(RequestBody)
    }
}
