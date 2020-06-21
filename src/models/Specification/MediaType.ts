import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Schema from "./Schema"
import { EncodingManager } from "./Encoding"
import { ReferenceManager, ReferenceType } from "./Reference"

export default class MediaType extends UniqueItem {
    readonly schema = new Schema('Schema')
    readonly exampleManager = new ReferenceManager(ReferenceType.examples)
    // readonly encodingManager = new EncodingManager

    toOAPI() {
        return {
            examples: this.exampleManager.toOAPI(),
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
