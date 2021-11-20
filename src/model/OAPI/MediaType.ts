import JSONText from '../Entity/JSONText'
import ObjectMap from '../Entity/ObjectMap'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { EncodingManager } from './Encoding'
import Reference, {
    OAPIReference,
    OAPIReferenceMap,
    ReferenceManager,
    TargetType,
} from './Reference'

export enum MediaTypeEnum {
    form = 'multipart/form-data',
    json = 'application/json',
    xml = 'application/xml',
}

export interface OAPIMediaType {
    encoding?: ObjectMap
    example?: Object
    examples?: OAPIReferenceMap
    schema: OAPIReference
}

export default class MediaType extends UniqueItem {
    readonly example = new JSONText()
    readonly schema = new Reference(0, TargetType.schemas)
    readonly encodingManager = new EncodingManager()
    readonly exampleManager = new ReferenceManager(TargetType.examples)

    toOAPI(finder: ReferenceFinder) {
        const result: OAPIMediaType = {
            schema: this.schema.toOAPI(finder),
        }
        if (this.exampleManager.list.length > 0) {
            result.examples = this.exampleManager.toOAPI(finder)
        }
        if (this.encodingManager.list.length > 0) {
            result.encoding = this.encodingManager.toOAPI(finder)
        }
        if (this.example.text === '{}') {
            return result
        }
        result.example = this.example.toOAPI()
        return result
    }
}

export class MediaTypeManager extends UniqueItemManager<MediaType> {
    constructor() {
        super(MediaType)
    }
}
