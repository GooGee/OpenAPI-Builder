import KeyValue from '../Base/KeyValue'
import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import { OperationManager } from './Operation'
import { ParameterManager, Location } from './Parameter'

export default class Path extends SideBarItem {
    description = ''
    summary = ''

    readonly operationManager = new OperationManager(this)
    readonly parameterManager = new ParameterManager(Location.path)

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
