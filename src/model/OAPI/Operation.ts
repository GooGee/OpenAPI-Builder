import Reference, { ReferenceManager, ReferenceType } from './Reference'
import Path from './Path'
import { exclude } from '../Decorator'
import KeyValue from '../Entity/KeyValue'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
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
    readonly parameterManager = new ReferenceManager(ReferenceType.parameters)
    readonly requestBody = new Reference('', ReferenceType.requestBodies)
    readonly statusManager = new StatusManager()
    readonly tagManager = new UniqueItemManager(UniqueItem)

    constructor(name: string, path: Path) {
        super(name)
        this.path = path
    }

    get type() {
        return this.un
    }

    toOAPI() {
        const id = [this.type].concat(this.path.un.split('/')).join('_')
        const tags = this.tagManager.list.map(tag => tag.un)
        const parameters = this.parameterManager.list.map(parameter => parameter.toOAPI())
        const result: KeyValue = {
            operationId: id,
            summary: this.summary,
            description: this.description,
            parameters: parameters,
            responses: this.statusManager.toOAPI(),
            tags: tags,
        }

        if (
            this.requestBody.un === '' ||
            this.type === OperationType.get ||
            this.type === OperationType.delete
        ) {
            return result
        }

        result.requestBody = this.requestBody.toOAPI()
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
