import { exclude } from '../Decorator'
import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { CallBackManager } from './CallBack'
import { NameReferenceManager } from './NameReference'
import Path from './Path'
import Reference, { ReferenceManager } from './Reference'
import { OAPIReference } from './ReferenceInterface'
import Response from './Response'
import {
    OAPISecurityRequirement,
    SecurityRequirementManager,
} from './SecurityRequirement'
import TargetType from './TargetType'

export const optionxx = [
    'get',
    'delete',
    'head',
    'options',
    'patch',
    'post',
    'put',
    'trace',
]

export enum OperationType {
    get = 'get',
    delete = 'delete',
    options = 'options',
    patch = 'patch',
    post = 'post',
    put = 'put',
}

interface OAPIOperation {
    callbacks?: ObjectMap<Response>
    deprecated: boolean
    description: string
    operationId: string
    parameters?: OAPIReference[]
    requestBody?: OAPIReference
    responses: ObjectMap<Response>
    security: OAPISecurityRequirement[]
    summary: string
    tags: string[]
}

export default class Operation extends UniqueItem {
    @exclude
    private readonly path: Path
    summary = ''
    deprecated = false
    description = ''
    readonly callbackManager = new CallBackManager()
    readonly parameterManager = new ReferenceManager(TargetType.parameters)
    readonly requestBody = new Reference(0, TargetType.requestBodies)
    readonly securityManager = new SecurityRequirementManager()
    readonly statusManager = new NameReferenceManager(TargetType.responses)
    readonly tagManager = new ReferenceManager(TargetType.tag)

    constructor(name: string, path: Path) {
        super(name)
        this.path = path
    }

    get type() {
        return this.un
    }

    toOAPI(finder: ReferenceFinderInterface) {
        const id = [this.type]
            .concat(this.path.un.split('/'))
            .join('_')
            .split('{')
            .join('')
            .split('}')
            .join('')
        const tags = this.tagManager.getUNxx(finder)
        const result: OAPIOperation = {
            operationId: id,
            summary: this.summary,
            description: this.description,
            deprecated: this.deprecated,
            security: this.securityManager.toOAPIArray(finder),
            responses: this.statusManager.toOAPI(finder),
            tags,
        }

        if (this.parameterManager.list.length) {
            result.parameters = this.parameterManager.toOAPIArray(finder)
        }

        if (this.callbackManager.list.length) {
            result.callbacks = this.callbackManager.toOAPI(finder)
        }

        if (this.requestBody.ui === 0) {
            return result
        }

        const request = finder.find(this.requestBody)
        if (request) {
            result.requestBody = this.requestBody.toOAPIofTarget(request)
        }
        return result
    }
}

export class OperationManager extends UniqueItemManager<Operation> {
    readonly path: Path

    constructor(path: Path) {
        super(Operation)
        this.path = path
    }

    make(name: string) {
        const item = new Operation(name, this.path)
        return item
    }
}
