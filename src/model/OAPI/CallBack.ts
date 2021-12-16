import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import Reference from './Reference'
import TargetType from './TargetType'

export default class CallBack extends UniqueItem {
    readonly path = new Reference(0, TargetType.paths)

    toOAPI(finder: ReferenceFinderInterface) {
        return this.path.toOAPI(finder)
    }
}

export class CallBackManager extends UniqueItemManager<CallBack> {
    constructor() {
        super(CallBack)
    }
}
