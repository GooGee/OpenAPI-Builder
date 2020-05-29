import Item from "../Base/Item"
import { ExampleManager } from "./Example"
import { LinkManager } from "./Link"
import { ParameterManager, Location } from "./Parameter"
import { RequestBodyManager } from "./RequestBody"
import { ResponseManager } from "./Response"
import { SchemaManager } from "./Schema"
import { CallBackManager } from "./CallBack"
import { SecuritySchemeManager } from "./SecurityScheme"

export default class Component extends Item {
    readonly callbackManager = new CallBackManager
    readonly exampleManager = new ExampleManager
    readonly headerManager = new ParameterManager(Location.header)
    readonly linkManager = new LinkManager
    readonly parameterManager = new ParameterManager(Location.path)
    readonly requestBodyManager = new RequestBodyManager
    readonly responseManager = new ResponseManager
    readonly schemaManager = new SchemaManager
    readonly securitySchemeManager = new SecuritySchemeManager

    toAPI() {
        return {
            callbacks: this.callbackManager.toAPI(),
            examples: this.exampleManager.toAPI(),
            headers: this.headerManager.toAPI(),
            links: this.linkManager.toAPI(),
            parameters: this.parameterManager.toAPI(),
            requestBodies: this.requestBodyManager.toAPI(),
            responses: this.responseManager.toAPI(),
            schemas: this.schemaManager.toAPI(),
            securitySchemes: this.securitySchemeManager.toAPI(),
        }
    }
}
