import { EnumerManager } from '../Entity/Enumer'
import ComponentInterface from './ComponentInterface'
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

export default interface DocumentInterface {
    component: ComponentInterface
    encodingManager: EncodingManager
    enumerManager: EnumerManager
    externalDocs: External
    fieldManager: SchemaFieldManager
    info: Info
    pathManager: PathManager
    scopeManager: ScopeManager
    securityManager: SecurityRequirementManager
    serverManager: ServerManager
    serverVariableManager: ServerVariableManager
    tagManager: TagManager

    importSchema(fieldxx: SchemaField[], ui: number): void
}
