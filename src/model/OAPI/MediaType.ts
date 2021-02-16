import KeyValue from '../Base/KeyValue'
import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import { EncodingManager } from './Encoding'
import { ReferenceManager, ReferenceType } from './Reference'
import SchemaSimple from './SchemaSimple'

export default class MediaType extends UniqueItem {
    readonly schema = new SchemaSimple('Schema')
    readonly exampleManager = new ReferenceManager(ReferenceType.examples)
    // readonly encodingManager = new EncodingManager

    toOAPI() {
        const result: KeyValue = {
            schema: this.schema.toOAPI(),
        }
        if (this.exampleManager.list.length > 0) {
            result.examples = this.exampleManager.toOAPI()
        }
        return result
    }
}

export class MediaTypeManager extends UniqueItemManager<MediaType> {
    constructor() {
        super(MediaType)
    }
}
