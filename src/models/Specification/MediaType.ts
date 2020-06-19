import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Schema from "./Schema"
import { EncodingManager } from "./Encoding"

export default class MediaType extends UniqueItem {
    readonly schema = new Schema('Schema')
    // readonly encodingManager = new EncodingManager

    toOAPI() {
        return {
            schema: this.schema.toOAPI(),
        }
    }
}

export class MediaTypeManager extends UniqueList<MediaType> {

    constructor() {
        super(MediaType)
    }

    toOAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
