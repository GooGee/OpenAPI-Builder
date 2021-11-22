import { EnumerManager } from '../Entity/Enumer'
import Item from '../Entity/Item'
import ReferenceFinder from '../Service/ReferenceFinder'
import Component from './Component'
import { EncodingManager } from './Encoding'
import External from './External'
import Info from './Info'
import { PathManager } from './Path'
import SchemaField, { SchemaFieldManager } from './SchemaField'
import { ScopeManager } from './Scope'
import { SecurityRequirementManager } from './SecurityRequirement'
import { ServerManager } from './Server'
import { ServerVariableManager } from './ServerVariable'
import { TagManager } from './Tag'

const Version = '3.0.3'

export default class Document extends Item {
    readonly component = new Component()
    readonly encodingManager = new EncodingManager()
    readonly enumerManager = new EnumerManager()
    readonly externalDocs = new External()
    readonly fieldManager = new SchemaFieldManager(false)
    readonly info = new Info()
    readonly pathManager = new PathManager()
    readonly scopeManager = new ScopeManager()
    readonly securityManager = new SecurityRequirementManager()
    readonly serverManager = new ServerManager()
    readonly serverVariableManager = new ServerVariableManager()
    readonly tagManager = new TagManager()

    importSchema(fieldxx: SchemaField[], ui: number) {
        fieldxx.forEach((field) => {
            const item = this.fieldManager.make(field.un)
            item.load(field)
            item.schemaUI = ui
            this.fieldManager.add(item)
        })
    }

    private removeNullReference(finder: ReferenceFinder) {
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

            const uixx = new Set(
                finder.getSchemaFieldList(schema).map((item) => item.ui),
            )
            schema.requiredManager.list
                .filter((item) => uixx.has(item.ui) === false)
                .forEach((item) => schema.requiredManager.remove(item))
        })
    }

    toOAPI(finder: ReferenceFinder) {
        this.removeNullReference(finder)
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
