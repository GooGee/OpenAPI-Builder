import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import { MediaTypeManager } from "./MediaType"

export default class RequestBody extends UniqueItem {
    required: boolean = true
    description: string = ''
    readonly mediaTypeManager = new MediaTypeManager

    toAPI() {
        return {
            required: this.required,
            description: this.description,
            content: this.mediaTypeManager.toAPI(),
        }
    }
}

export class RequestBodyManager extends UniqueList<RequestBody> {

    constructor() {
        super(RequestBody)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
