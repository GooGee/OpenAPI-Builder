import KeyValue from '../Entity/KeyValue'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { EncodingManager } from './Encoding'
import { ReferenceManager, TargetType } from './Reference'
import SchemaField from './SchemaField'

export enum MediaTypeEnum {
    form = 'multipart/form-data',
    json = 'application/json',
    xml = 'application/xml',
}

export default class MediaType extends UniqueItem {
    readonly schema = new SchemaField('')
    readonly encodingManager = new EncodingManager()
    readonly exampleManager = new ReferenceManager(TargetType.examples)

    toOAPI(finder: ReferenceFinder) {
        const result: KeyValue = {
            schema: this.schema.toOAPI(finder),
        }
        if (this.exampleManager.list.length > 0) {
            result.examples = this.exampleManager.toOAPI(finder)
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
