import Item from "../Base/Item"
import Component from "./Component"
import External from "./External"
import Info from "./Info"
import { PathManager } from "./Path"
import { ServerManager } from "./Server"
import { SecurityManager } from "./Security"
import { TagManager } from "./Tag"

const Version = '3.0.3'

export default class Document extends Item {
    readonly info = new Info
    readonly component = new Component
    readonly externalDocs = new External
    readonly pathManager = new PathManager
    readonly securityManager = new SecurityManager
    readonly serverManager = new ServerManager
    readonly tagManager = new TagManager

    toAPI() {
        return {
            openapi: Version,
            info: this.info.toAPI(),
            components: this.component.toAPI(),
            paths: this.pathManager.toAPI(),
            security: this.securityManager.toAPI(),
            servers: this.serverManager.toAPI(),
            tags: this.tagManager.toAPI(),
            externalDocs: this.externalDocs.toAPI(),
        }
    }
}
