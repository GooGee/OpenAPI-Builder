import Component from './Component'
import External from './External'
import Info from './Info'
import { PathManager } from './Path'
import { ReferenceType } from './Reference'
import { ServerManager } from './Server'
import { SecurityManager } from './Security'
import { TagManager } from './Tag'
import { compositionTypeList, simpleTypeList } from './DataType'
import Item from '../Base/Item'

const Version = '3.0.3'

export default class Document extends Item {
    readonly info = new Info()
    readonly component = new Component()
    readonly externalDocs = new External()
    readonly pathManager = new PathManager()
    // readonly securityManager = new SecurityManager
    readonly serverManager = new ServerManager()
    readonly tagManager = new TagManager()

    get compositionTypeList() {
        return compositionTypeList
    }

    get simpleTypeList() {
        return simpleTypeList
    }

    getManager(type: ReferenceType) {
        switch (type) {
            case ReferenceType.examples:
                return this.component.exampleManager

            case ReferenceType.headers:
                return this.component.headerManager

            case ReferenceType.parameters:
                return this.component.parameterManager

            case ReferenceType.requestBodies:
                return this.component.requestBodyManager

            case ReferenceType.responses:
                return this.component.responseManager

            case ReferenceType.schemas:
                return this.component.schemaManager

            default:
                break
        }
        throw new Error('Unknown ReferenceType: ' + type)
    }

    toOAPI() {
        return {
            openapi: Version,
            info: this.info.toOAPI(),
            components: this.component.toOAPI(),
            paths: this.pathManager.toOAPI(),
            // security: this.securityManager.toOAPIArray(),
            // servers: this.serverManager.toOAPIArray(),
            tags: this.tagManager.toOAPIArray(),
            externalDocs: this.externalDocs.toOAPI(),
        }
    }
}
