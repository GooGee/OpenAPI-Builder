import Reference, { ReferenceManager, ReferenceType } from "./Reference"
import { StatusManager } from "./Status"
import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export enum OperationType {
    get = 'get',
    delete = 'delete',
    options = 'options',
    patch = 'patch',
    post = 'post',
    put = 'put',
}

export default class Operation extends UniqueItem {
    readonly path: string
    operationId: string = ''
    summary: string = ''
    deprecated: boolean = false
    description: string = ''
    readonly parameterManager = new ReferenceManager(ReferenceType.parameters)
    readonly requestBody = new Reference('', ReferenceType.requestBodies)
    readonly statusManager = new StatusManager
    readonly tagManager = new UniqueList(UniqueItem)

    constructor(name: string, path: string) {
        super(name)
        this.path = path
    }

    get type() {
        return this.name
    }

    toAPI() {
        const id = [this.type].concat(this.path.split('/')).join('_')
        const tags = this.tagManager.list.map(tag => tag.name)
        const parameters = this.parameterManager.list.map(parameter => parameter.toAPI())
        const data: KeyValue = {
            operationId: id,
            summary: this.summary,
            description: this.description,
            parameters: parameters,
            responses: this.statusManager.toAPI(),
            tags: tags,
        }

        if (this.requestBody.name === '' || this.type === OperationType.get || this.type === OperationType.delete) {
            return data
        }

        data['requestBody'] = this.requestBody.toAPI()
        return data
    }
}

export class OperationManager extends UniqueList<Operation> {
    readonly path: string

    constructor(path: string) {
        super(Operation)
        this.path = path
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
