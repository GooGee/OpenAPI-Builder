import Reference, { ReferenceManager, ReferenceType } from "./Reference"
import { StatusManager } from "./Status"
import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Path from "./Path"

export enum OperationType {
    get = 'get',
    delete = 'delete',
    options = 'options',
    patch = 'patch',
    post = 'post',
    put = 'put',
}

export default class Operation extends UniqueItem {
    readonly path: Path
    operationId: string = ''
    summary: string = ''
    deprecated: boolean = false
    description: string = ''
    readonly parameterManager = new ReferenceManager(ReferenceType.parameters)
    readonly requestBody = new Reference('', ReferenceType.requestBodies)
    readonly statusManager = new StatusManager
    readonly tagManager = new UniqueList(UniqueItem)
    protected static IgnoreList = UniqueItem.IgnoreList.concat(['path'])

    constructor(name: string, path: Path) {
        super(name)
        this.path = path
    }

    get type() {
        return this.name
    }

    toAPI() {
        const id = [this.type].concat(this.path.name.split('/')).join('_')
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
    readonly path: Path

    constructor(path: Path) {
        super(Operation)
        this.path = path
    }

    make(name: string) {
        const item = new Operation(name, this.path)
        return item
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
