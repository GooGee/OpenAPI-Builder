import Item from '../Entity/Item'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import { CallBackManager } from './CallBack'
import ComponentInterface from './ComponentInterface'
import { ExampleManager } from './Example'
import { LinkManager } from './Link'
import { ParameterManager, Location } from './Parameter'
import { RequestBodyManager } from './RequestBody'
import { ResponseManager } from './Response'
import { SchemaManager } from './SchemaComplex'
import { SecuritySchemeManager } from './SecurityScheme'

export default class Component extends Item implements ComponentInterface {
    readonly callbackManager = new CallBackManager()
    readonly exampleManager = new ExampleManager()
    readonly headerManager = new ParameterManager(Location.header)
    readonly linkManager = new LinkManager()
    readonly parameterManager = new ParameterManager(Location.path)
    readonly requestBodyManager = new RequestBodyManager()
    readonly responseManager = new ResponseManager()
    readonly schemaManager = new SchemaManager()
    readonly securitySchemeManager = new SecuritySchemeManager()

    toOAPI(finder: ReferenceFinderInterface) {
        return {
            callbacks: this.callbackManager.toOAPI(finder),
            examples: this.exampleManager.toOAPI(finder),
            headers: this.headerManager.toOAPI(finder),
            links: this.linkManager.toOAPI(finder),
            parameters: this.parameterManager.toOAPI(finder),
            requestBodies: this.requestBodyManager.toOAPI(finder),
            responses: this.responseManager.toOAPI(finder),
            schemas: this.schemaManager.toOAPI(finder),
            securitySchemes: this.securitySchemeManager.toOAPI(finder),
        }
    }
}
