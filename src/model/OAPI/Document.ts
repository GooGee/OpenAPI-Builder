import Item from '../Entity/Item'
import ReferenceFinder from '../Service/ReferenceFinder'
import Component from './Component'
import External from './External'
import Info from './Info'
import { PathManager } from './Path'
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

    getSchemaFieldList(schema: SchemaComplex) {
        const set: Set<number> = new Set()
        this.getReferenceList(schema, set)
        return this.fieldManager.list.filter((item) => set.has(item.schemaUI))
    }

    private getReferenceList(schema: SchemaComplex, set: Set<number>) {
        if (schema.isTemplate) {
            return
        }
        if (set.has(schema.ui)) {
            return
        }
        set.add(schema.ui)

        const uixx = new Set(schema.referenceManager.list.map((item) => item.ui))
        this.component.schemaManager.list.forEach((item) => {
            if (uixx.has(item.ui)) {
                this.getReferenceList(item, set)
            }
        })
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
            if (schema.isTemplate) {
                return
            }

            if (schema.requiredManager.list.length === 0) {
                return
            }

            if (schema.referenceManager.list.length === 0) {
                schema.requiredManager.clear()
                return
            }

            const uixx = new Set(this.getSchemaFieldList(schema).map((item) => item.ui))
            schema.requiredManager.list
                .filter((item) => uixx.has(item.ui) === false)
                .forEach((item) => schema.requiredManager.remove(item))
        })
    }

    toOAPI(finder: ReferenceFinder) {
        this.removeNullReference()
        return {
            openapi: Version,
            info: this.info.toOAPI(),
            components: this.component.toOAPI(finder),
            paths: this.pathManager.toOAPI(finder),
            security: this.securityManager.toOAPIArray(finder),
            servers: this.serverManager.toOAPIArray(finder),
            tags: this.tagManager.toOAPIArray(finder),
            externalDocs: this.externalDocs.toOAPI(),
        }
    }
}
