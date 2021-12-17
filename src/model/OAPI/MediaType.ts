import JSONText from '../Entity/JSONText'
import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import Reference, { OAPIReferenceMap, ReferenceManager } from './Reference'
import { OAPIReference } from './ReferenceInterface'
import SchemaComplex from './SchemaComplex'
import SchemaField from './SchemaField'
import TargetType from './TargetType'

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
    readonly exampleManager = new ReferenceManager(TargetType.examples)

    makeEncoding(finder: ReferenceFinderInterface, schema: SchemaComplex) {
        const fieldxx = finder.getSchemaFieldList(schema) as SchemaField[]
        if (fieldxx.length === 0) {
            return []
        }
        const uiMap: Map<number, SchemaField> = new Map()
        fieldxx.forEach((field) => {
            if (field.isObject) {
                uiMap.set(field.reference.ui, field)
            }
        })

        let found = false
        const map: ObjectMap<any> = {}
        finder.findManager(TargetType.encoding).list.forEach((item) => {
            const field = uiMap.get(item.ui)
            if (field) {
                found = true
                map[field.un] = item.toOAPI(finder)
            }
        })
        if (found) {
            return map
        }
        return undefined
    }

    toOAPI(finder: ReferenceFinderInterface) {
        const schema = this.schema.getTarget(finder)
        const result: OAPIMediaType = {
            schema: this.schema.toOAPIofTarget(schema),
        }
        result.encoding = this.makeEncoding(finder, schema as SchemaComplex)
        if (this.exampleManager.list.length > 0) {
            result.examples = this.exampleManager.toOAPI(finder)
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
