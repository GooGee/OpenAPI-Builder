import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { MediaTypeManager } from './MediaType'

export default class RequestBody extends SideBarItem {
    required = true
    description = ''
    readonly mediaTypeManager = new MediaTypeManager()

    toOAPI() {
        return {
            content: this.mediaTypeManager.toOAPI(),
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
