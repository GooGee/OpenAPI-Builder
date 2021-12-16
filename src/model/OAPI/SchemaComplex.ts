import JSONText from '../Entity/JSONText'
import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import UniqueItemManager from '../Entity/UniqueItemManager'
import Discriminator, { OAPIDiscriminator } from './Discriminator'
import { ReferenceManager } from './Reference'
import { OAPIReference } from './ReferenceInterface'
import Schema from './Schema'
import SchemaField, { SchemaFieldManager } from './SchemaField'
import TargetType from './TargetType'

export enum CompositionType {
    allOf = 'allOf',
    anyOf = 'anyOf',
    multipleOf = 'multipleOf',
    oneOf = 'oneOf',
}

export const compositionTypeList = Object.values(CompositionType)

export interface OAPISchema {
    description: string
    example?: Object
    required?: string[]
}

export type OAPIComposition = OAPISchema & {
    [key in CompositionType]?: OAPIReference[]
} & {
    discriminator?: OAPIDiscriminator
}

export interface OAPISchemaObject extends OAPISchema {
    properties: ObjectMap
    text?: Object
    type: string
}

export default class SchemaComplex extends Schema {
    compositionType: CompositionType = CompositionType.allOf
    isTemplate = false
    readonly discriminator = new Discriminator()
    readonly example = new JSONText()
    readonly excludedManager = new ReferenceManager(TargetType.field)
    readonly flowManager = new ReferenceManager(TargetType.flow)
    readonly referenceManager = new ReferenceManager(TargetType.schemas)
    readonly requiredManager = new ReferenceManager(TargetType.field)
    readonly text = new JSONText()

    get isComposition() {
        return this.isTemplate === false
    }

    makeOAPI(
        finder: ReferenceFinderInterface,
        fieldManager: SchemaFieldManager,
        fieldxx: SchemaField[],
    ) {
        if (fieldxx.length === 0) {
            return {} as Object
        }

        const result: OAPISchemaObject = {
            type: 'object',
            description: this.description,
            properties: fieldManager.arrayToOAPI(fieldxx, finder),
        }
        const list = fieldxx.filter((one) => one.required).map((one) => one.un)
        if (list.length) {
            result.required = list
        }
        if (this.example.text === '{}') {
            return result
        }
        result.example = this.example.toOAPI()
        return result
    }

    toOAPI(finder: ReferenceFinderInterface) {
        if (this.isTemplate) {
            return this.text.toOAPI()
        }

        const fieldManager = finder.findManager(
            TargetType.field,
        ) as any as SchemaFieldManager
        if (this.excludedManager.list.length) {
            const excludedxx = new Set(this.excludedManager.list.map((item) => item.ui))
            const fieldxx = finder
                .getSchemaFieldList(this)
                .filter((field) => excludedxx.has(field.ui) === false) as SchemaField[]
            return this.makeOAPI(finder, fieldManager, fieldxx)
        }

        const fieldxx = fieldManager.findAllField(this.ui)
        if (this.referenceManager.list.length) {
            const list = this.referenceManager.toOAPIArray(finder)
            const result: OAPIComposition = {
                description: this.description,
                [this.compositionType]: list,
            }
            if (this.discriminator.propertyName) {
                result.discriminator = this.discriminator.toOAPI(finder)
            }
            if (this.requiredManager.list.length) {
                result.required = this.requiredManager.toUNArray(finder)
            }
            if (fieldxx.length) {
                list.push(this.makeOAPI(finder, fieldManager, fieldxx) as any)
            }
            return result
        }

        return this.makeOAPI(finder, fieldManager, fieldxx)
    }
}

export class SchemaManager extends UniqueItemManager<SchemaComplex> {
    constructor() {
        super(SchemaComplex)
    }

    toOAPI(finder: ReferenceFinderInterface) {
        const map: ObjectMap<Object> = {}
        this.list.forEach((item) => (map[item.un] = item.toOAPI(finder)))
        return map
    }
}
