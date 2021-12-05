import ObjectMap from '../Entity/ObjectMap'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import Reference, {
    OAPIReference,
    OAPIReferenceMap,
    ReferenceManager,
    TargetType,
} from './Reference'
import SchemaComplex from './SchemaComplex'

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
    readonly schema = new Reference(0, TargetType.schemas)
    readonly exampleManager = new ReferenceManager(TargetType.examples)

    getEncodingList(finder: ReferenceFinder, schema: SchemaComplex) {
        const fieldxx = finder.getSchemaFieldList(schema)
        if (fieldxx.length === 0) {
            return []
        }
        const uixx = new Set()
        fieldxx.forEach((field) => {
            if (field.isObject) {
                uixx.add(field.reference.ui)
            }
        })
        return finder
            .findManager(TargetType.encoding)
            .list.filter((item) => uixx.has(item.ui))
    }

    toOAPI(finder: ReferenceFinder) {
        const schema = this.schema.getTarget(finder)
        const result: OAPIMediaType = {
            schema: this.schema.toOAPIofTarget(schema),
        }
        const encodingxx = this.getEncodingList(finder, schema as SchemaComplex)
        if (encodingxx.length > 0) {
            result.encoding = UniqueItemManager.arrayToOAPI(encodingxx, finder)
        }
        if (this.exampleManager.list.length > 0) {
            result.examples = this.exampleManager.toOAPI(finder)
        }
        return result
    }
}

export class MediaTypeManager extends UniqueItemManager<MediaType> {
    constructor() {
        super(MediaType)
    }
}
