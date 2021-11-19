import JSONText from '../Entity/JSONText'
import KeyValue from '../Entity/KeyValue'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { CompositionType } from './DataType'
import Discriminator from './Discriminator'
import { ReferenceManager, TargetType } from './Reference'
import Schema from './Schema'
import SchemaField, { SchemaFieldManager } from './SchemaField'

export default class SchemaComplex extends Schema {
    compositionType: CompositionType = CompositionType.allOf
    isTemplate = false
    readonly discriminator = new Discriminator()
    readonly example = new JSONText()
    readonly excludedManager = new ReferenceManager(TargetType.field)
    readonly referenceManager = new ReferenceManager(TargetType.schemas)
    readonly requiredManager = new ReferenceManager(TargetType.field)
    readonly text = new JSONText()

    get isComposition() {
        return this.isTemplate === false
    }

    makeOAPI(
        finder: ReferenceFinder,
        fieldManager: SchemaFieldManager,
        fieldxx: SchemaField[],
    ): KeyValue {
        if (fieldxx.length === 0) {
            return {}
        }

        const result: KeyValue = {
            type: 'object',
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

    toOAPI(finder: ReferenceFinder) {
        if (this.isTemplate) {
            return this.text.toOAPI()
        }

        const fieldManager = finder.findManager(TargetType.field) as SchemaFieldManager
        if (this.excludedManager.list.length) {
            const excludedxx = new Set(this.excludedManager.list.map((item) => item.ui))
            const fieldxx = finder
                .getSchemaFieldList(this)
                .filter((field) => excludedxx.has(field.ui) === false)
            return this.makeOAPI(finder, fieldManager, fieldxx)
        }

        const fieldxx = fieldManager.findAllField(this.ui)
        if (this.referenceManager.list.length) {
            const list = this.referenceManager.toOAPIArray(finder)
            const result: KeyValue = {
                [this.compositionType]: list,
            }
            if (this.discriminator.propertyName) {
                result.discriminator = this.discriminator.toOAPI(finder)
            }
            if (this.requiredManager.list.length) {
                result.required = this.requiredManager
                    .getTargetxx(finder)
                    .map((item) => item.un)
            }
            if (fieldxx.length) {
                list.push(this.makeOAPI(finder, fieldManager, fieldxx))
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

    toOAPI(finder: ReferenceFinder) {
        const map: KeyValue = {}
        this.list.forEach((item) => {
            map[item.un] = item.toOAPI(finder)
        })
        return map
    }
}
