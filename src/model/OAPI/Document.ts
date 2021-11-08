import Item from '../Entity/Item'
import UniqueItem from '../Entity/UniqueItem'
import Component from './Component'
import External from './External'
import Info from './Info'
import { PathManager } from './Path'
import { ReferenceType } from './Reference'
import SchemaComplex from './SchemaComplex'
import SchemaField, { SchemaFieldManager } from './SchemaField'
import { SecurityRequirementManager } from './SecurityRequirement'
import { ServerManager } from './Server'
import { TagManager } from './Tag'

const Version = '3.0.3'

export default class Document extends Item {
    readonly component = new Component()
    readonly externalDocs = new External()
    readonly fieldManager = new SchemaFieldManager(false)
    readonly info = new Info()
    readonly pathManager = new PathManager()
    readonly securityManager = new SecurityRequirementManager()
    readonly serverManager = new ServerManager()
    readonly tagManager = new TagManager()

    getManager(type: ReferenceType) {
        switch (type) {
            case ReferenceType.examples:
                return this.component.exampleManager

            case ReferenceType.headers:
                return this.component.headerManager

            case ReferenceType.parameters:
                return this.component.parameterManager

            case ReferenceType.paths:
                return this.pathManager

            case ReferenceType.requestBodies:
                return this.component.requestBodyManager

            case ReferenceType.responses:
                return this.component.responseManager

            case ReferenceType.schemas:
                return this.component.schemaManager

            case ReferenceType.security:
                return this.component.securitySchemeManager

            default:
                break
        }
        throw new Error('Unknown ReferenceType: ' + type)
    }

    getSchemaFieldList(schema: SchemaComplex) {
        return this.getSchemaFieldxx(schema, new Set())
    }

    private getSchemaFieldxx(
        schema: SchemaComplex,
        set: Set<SchemaComplex>,
    ): SchemaField[] {
        if (set.has(schema)) {
            return []
        }
        set.add(schema)
        if (schema.isTemplate) {
            return []
        }
        let list: SchemaField[] = this.fieldManager.findAll(schema.ui)
        schema.composition.referenceManager.list.forEach((item) => {
            const found = this.component.schemaManager.findByUN(item.un)
            if (found) {
                list = list.concat(this.getSchemaFieldxx(found, set))
            }
        })
        return list
    }

    importSchema(fieldxx: SchemaField[], ui: number) {
        fieldxx.forEach((field) => {
            const item = this.fieldManager.make(field.un)
            item.load(field)
            item.schemaUI = ui
            this.fieldManager.add(item)
        })
    }

    private removeNullReference() {
        this.component.schemaManager.list.forEach((schema) => {
            if (schema.isComposition) {
                const fieldxx = this.getSchemaFieldList(schema)
                const notFoundxx: UniqueItem[] = []
                schema.composition.requiredManager.list.forEach((item) => {
                    const found = fieldxx.find((field) => field.un === item.un)
                    if (found === undefined) {
                        notFoundxx.push(item)
                    }
                })
                notFoundxx.forEach((item) => {
                    schema.composition.requiredManager.remove(item)
                })
            }
        })
    }

    toOAPI() {
        this.removeNullReference()
        return {
            openapi: Version,
            info: this.info.toOAPI(),
            components: this.component.toOAPI(this),
            paths: this.pathManager.toOAPI(),
            security: this.securityManager.toOAPIArray(),
            servers: this.serverManager.toOAPIArray(),
            tags: this.tagManager.toOAPIArray(),
            externalDocs: this.externalDocs.toOAPI(),
        }
    }
}
