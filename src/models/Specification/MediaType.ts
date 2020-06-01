import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Schema from "./Schema"
import { EncodingManager } from "./Encoding"

export default class MediaType extends UniqueItem {
    readonly schema = new Schema('Schema')
    readonly encodingManager = new EncodingManager

    toAPI() {
        return {
            schema: this.schema.toAPI(),
            encoding: this.encodingManager.toAPI()
        }
    }
}

export class MediaTypeManager extends UniqueList<MediaType> {

    constructor() {
        super(MediaType)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
