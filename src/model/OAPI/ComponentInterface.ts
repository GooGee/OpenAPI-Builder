import { CallBackManager } from './CallBack'
import { ExampleManager } from './Example'
import { LinkManager } from './Link'
import { ParameterManager } from './Parameter'
import { RequestBodyManager } from './RequestBody'
import { ResponseManager } from './Response'
import { SchemaManager } from './SchemaComplex'
import { SecuritySchemeManager } from './SecurityScheme'

export default interface ComponentInterface {
    callbackManager: CallBackManager
    exampleManager: ExampleManager
    headerManager: ParameterManager
    linkManager: LinkManager
    parameterManager: ParameterManager
    requestBodyManager: RequestBodyManager
    responseManager: ResponseManager
    schemaManager: SchemaManager
    securitySchemeManager: SecuritySchemeManager
}
