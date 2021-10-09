import KeyValue from '../Entity/KeyValue'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { OperationManager } from './Operation'
import { ReferenceManager, ReferenceType } from './Reference'

export default class Path extends SideBarItem {
    description = ''
    summary = ''

    readonly operationManager = new OperationManager(this)
    readonly parameterManager = new ReferenceManager(ReferenceType.parameters)

    toOAPI() {
        const result: KeyValue = this.operationManager.toOAPI()
        if (this.parameterManager.list.length) {
            result.parameters = this.parameterManager.toOAPIArray()
        }
        if (this.description) {
            result.description = this.description
        }
        if (this.summary) {
            result.summary = this.summary
        }
        return result
    }
}

export class PathManager extends UniqueItemManager<Path> {
    constructor() {
        super(Path)
    }
}
