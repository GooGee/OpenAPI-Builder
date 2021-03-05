import KeyValue from '../Base/KeyValue'
import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import { EncodingManager } from './Encoding'
import { ReferenceManager, ReferenceType } from './Reference'
import SchemaSimple from './SchemaSimple'

export enum MediaTypeEnum {
    form = 'multipart/form-data',
    json = 'application/json',
    xml = 'application/xml',
}

export default class MediaType extends UniqueItem {
    readonly schema = new SchemaSimple('')
    readonly encodingManager = new EncodingManager()
    readonly exampleManager = new ReferenceManager(ReferenceType.examples)

    toOAPI() {
        const result: KeyValue = {
            schema: this.schema.toOAPI(),
        }
        if (this.exampleManager.list.length > 0) {
            result.examples = this.exampleManager.toOAPI()
        }
        if (this.encodingManager.list.length > 0) {
            result.encoding = this.encodingManager.toOAPI()
        }
        return result
    }
}

export class MediaTypeManager extends UniqueItemManager<MediaType> {
    constructor() {
        super(MediaType)
    }
}
