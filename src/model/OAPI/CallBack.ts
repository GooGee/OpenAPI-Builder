import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import Reference, { TargetType } from './Reference'

export default class CallBack extends SideBarItem {
    readonly path = new Reference(0, TargetType.paths)

    toOAPI(finder: ReferenceFinder) {
        return this.path.toOAPI(finder)
    }
}

export class CallBackManager extends UniqueItemManager<CallBack> {
    constructor() {
        super(CallBack)
    }
}
