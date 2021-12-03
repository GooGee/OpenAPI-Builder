import { exclude } from '../Decorator'
import ObjectMap from '../Entity/ObjectMap'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { CallBackManager } from './CallBack'
import { NameReferenceManager } from './NameReference'
import Path from './Path'
import Reference, { OAPIReference, ReferenceManager, TargetType } from './Reference'
import Response from './Response'

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
    readonly statusManager = new NameReferenceManager(TargetType.responses)
    readonly tagManager = new ReferenceManager(TargetType.tag)

    constructor(name: string, path: Path) {
        super(name)
        this.path = path
    }

    get type() {
        return this.un
    }

    toOAPI(finder: ReferenceFinder) {
        const id = [this.type]
            .concat(this.path.un.split('/'))
            .join('_')
            .split('{')
            .join('')
            .split('}')
            .join('')
        const tags = this.tagManager.toUNArray(finder)
        const result: OAPIOperation = {
            operationId: id,
            summary: this.summary,
            description: this.description,
            deprecated: this.deprecated,
            responses: this.statusManager.toOAPI(finder),
            tags,
        }

        if (this.parameterManager.list.length) {
            result.parameters = this.parameterManager.toOAPIArray(finder)
        }

        if (this.callbackManager.list.length) {
            result.callbacks = this.callbackManager.toOAPI(finder)
        }

        if (
            this.requestBody.ui === 0 ||
            this.type === OperationType.get ||
            this.type === OperationType.delete
        ) {
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
