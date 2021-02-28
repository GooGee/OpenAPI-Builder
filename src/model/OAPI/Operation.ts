import { exclude } from '../Base/Decorator'
import KeyValue from '../Base/KeyValue'
import Reference, { ReferenceManager, ReferenceType } from './Reference'
import { StatusManager } from './Status'
import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import Path from './Path'

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
        return this.ui
    }

    toOAPI() {
        const id = [this.type].concat(this.path.ui.split('/')).join('_')
        const tags = this.tagManager.list.map(tag => tag.ui)
        const parameters = this.parameterManager.list.map(parameter => parameter.toOAPI())
        const data: KeyValue = {
            operationId: id,
            summary: this.summary,
            description: this.description,
            parameters: parameters,
            responses: this.statusManager.toOAPI(),
            tags: tags,
        }

        if (
            this.requestBody.ui === '' ||
            this.type === OperationType.get ||
            this.type === OperationType.delete
        ) {
            return data
        }

        data.requestBody = this.requestBody.toOAPI()
        return data
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
