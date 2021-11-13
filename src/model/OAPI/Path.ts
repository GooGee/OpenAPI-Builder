import KeyValue from '../Entity/KeyValue'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { OperationManager } from './Operation'
import { ReferenceManager, TargetType } from './Reference'

export default class Path extends SideBarItem {
    description = ''
    summary = ''

    readonly operationManager = new OperationManager(this)
    readonly parameterManager = new ReferenceManager(TargetType.parameters)

    toOAPI(finder: ReferenceFinder) {
        const result: KeyValue = this.operationManager.toOAPI(finder)
        if (this.parameterManager.list.length) {
            result.parameters = this.parameterManager.toOAPIArray(finder)
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
