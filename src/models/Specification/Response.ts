import { MediaTypeManager } from "./MediaType"
import { ReferenceManager, ReferenceType } from "./Reference"
import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Response extends UniqueItem {
    description: string = ''
    readonly headerManager = new ReferenceManager(ReferenceType.headers)
    readonly linkManager = new ReferenceManager(ReferenceType.links)
    readonly mediaTypeManager = new MediaTypeManager

    toAPI() {
        return {
            description: this.description,
            headers: this.headerManager.toAPI(),
            // links: this.linkManager.toAPI(),
            content: this.mediaTypeManager.toAPI(),
        }
    }
}

export class ResponseManager extends UniqueList<Response> {

    constructor() {
        super(Response)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
