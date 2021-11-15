import { exclude } from '../Decorator'
import KeyValue from '../Entity/KeyValue'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { CallBackManager } from './CallBack'
import Path from './Path'
import Reference, { ReferenceManager, TargetType } from './Reference'
import { StatusManager } from './Status'

export enum OperationType {
    get = 'get',
    delete = 'delete',
    options = 'options',
    patch = 'patch',
    post = 'post',
    put = 'put',
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
    readonly statusManager = new StatusManager()
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
        const tags = this.tagManager.getTargetxx(finder).map((tag) => tag.un)
        const result: KeyValue = {
            operationId: id,
            summary: this.summary,
            description: this.description,
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

        const request = finder.find(this.requestBody.ui, this.requestBody.type)
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
