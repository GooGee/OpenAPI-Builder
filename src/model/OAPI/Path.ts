import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { OperationManager } from './Operation'
import { ReferenceManager } from './Reference'
import { OAPIReference } from './ReferenceInterface'
import TargetType from './TargetType'

interface OAPIPath {
    description?: string
    parameters?: OAPIReference[]
    summary?: string
}

export default class Path extends SideBarItem {
    summary = ''

    readonly operationManager = new OperationManager(this)
    readonly parameterManager = new ReferenceManager(TargetType.parameters)

    toOAPI(finder: ReferenceFinderInterface) {
        const result: OAPIPath = this.operationManager.toOAPI(finder) as any
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
